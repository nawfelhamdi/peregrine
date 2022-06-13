CREATE proc [dds].[sp_gmm_variable_all_run] as 
begin

truncate table dds.gmm_variable_all_run;

--premium transformation
with pre_join as(
	select pre.*,EOMONTH(banking_date) as Date,ref_pol.ifrs_17_group,ref_var.ri_variable from [raw].[gmm_premium] pre 
	left join [raw].[gmm_ref_policy] ref_pol
	on pre.Policy_Number=ref_pol.policy_number
	left join [raw].[gmm_ref_variable] ref_var
	on pre.transaction_type = ref_var.transaction_type
), 
pre_group_by as
	(select ri_variable,ifrs_17_group ,sum(gross_payment) as allocated_amount from pre_join
	group by ri_variable,ifrs_17_group
), 
--claim transformation
claim_join as(
	select claim.*,eomonth(claim.ACTION_DATE) as Date,ref_pol.ifrs_17_group,ref_var.ri_variable from [raw].[gmm_claim] claim 
	left join [raw].[gmm_ref_policy] ref_pol
	on claim.Policy_Number=ref_pol.policy_number
	left join [raw].[gmm_ref_variable] ref_var
	on claim.Description = ref_var.transaction_type
	), 
claim_group_by as (
	select ri_variable,ifrs_17_group,sum(CLAIM_AMT) as allocated_amount from claim_join
	group by ri_variable,ifrs_17_group
), 

expen_union as (
select *,'Direct_Group' as ifrs_17_group from raw.gmm_expense_direct
union all
select *,'Reinsurance_Group' as ifrs_17_group from raw.gmm_expense_reinsurance
),
expen_join as(
	select expen_union.*,
	expen_union.transaction_amount * ref_expen.insurance_acquistion_cashflow as [insurance acquistion cashflow],
	expen_union.transaction_amount * ref_expen.claim_handling_cost  as [claim handling cost],
	expen_union.transaction_amount * ref_expen.policy_administration_and_maintenance  as [policy administration and maintenance],
	null as [other]
	from expen_union
	inner join raw.gmm_ref_expense_mapping ref_expen
	on expen_union.gl_code=ref_expen.gl_code
	union
	select expen_union.*,
	null as [insurance acquistion cashflow],
	null  as [claim handling cost],
	null as [policy administration and maintenance],
	cast(expen_union.transaction_amount as float) as [other]
	from expen_union
where transaction_id not in (select transaction_id from expen_union inner join raw.gmm_ref_expense_mapping ref_expen on expen_union.gl_code=ref_expen.gl_code)),
expen_unpvt as(
	SELECT transaction_id, transaction_date, gl_code, description, transaction_amount, allocated_amount, transaction_type,ifrs_17_group
	FROM expen_join
	UNPIVOT
	(allocated_amount FOR transaction_type IN ([insurance acquistion cashflow], [claim handling cost], [policy administration and maintenance],[other])  
	)AS unpvt) 
,
expen_join2 as(
	select expen_unpvt.*,ref_var.ri_variable from expen_unpvt 
	left join raw.gmm_ref_variable ref_var
	on expen_unpvt.transaction_type = ref_var.transaction_type
),
expen_group_by as(
	select 
	ri_variable,
	ifrs_17_group,
	sum(expen_join2.allocated_amount) as allocated_amount 
	from expen_join2
	group by expen_join2.ri_variable,ifrs_17_group
	),

--combining groupby table
combined as(
	select * from pre_group_by
	union all
	select * from claim_group_by
	union all
	select * from expen_group_by
)
insert into dds.gmm_variable_all_run
	select 
	case RIGHT(ri_variable, (CHARINDEX('_',REVERSE(ri_variable),0))-1) when 'FUT' then '42' when 'CUR' then null end as run_number,
	ifrs_17_group as ifrs_group_code,
	case ifrs_17_group when 'Reinsurance_Group' then 'Direct_Group' else null end as underlying_ifrs_group_code,
	'CAD' as transaction_currency_code,
	ri_variable as variable_name,
	null as [2020-09-30],
	null as [2020-10-31],
	null as [2020-11-30],
	case when concat(ifrs_17_group,',',ri_variable) in (
	'Direct_Group,P_PAID_FUT',
'Direct_Group,P_OTHER_PAID_FUT',
'Reinsurance_Group,P_OTHER_PAID_FUT',
'Reinsurance_Group,B_PAID_CUR',
'Reinsurance_Group,E_PAID_CUR',
'Reinsurance_Group,IC_PAID_CUR'
) then isnull(allocated_amount,0)*-1 else isnull(allocated_amount,0) end as [2020-12-31],
'Data Factory',
dateadd(hour,-4,getdate()),
'Data Factory',
dateadd(hour,-4,getdate())
	from combined
	union all
	select * from raw.gmm_variable_all_run_actuarial
end
GO