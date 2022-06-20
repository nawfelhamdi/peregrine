/****** Object:  StoredProcedure [dds].[sp_paa_variable_all_run]    Script Date: 6/20/2022 4:25:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dds].[sp_paa_variable_all_run] @project_id int as
begin

delete from dds.paa_variable_all_run where project_id=@project_id

insert into dds.paa_variable_all_run
           ([run_number]
           ,[ifrs_group_code]
           ,[variable_name]
           ,[transaction_currency_code]
           ,[underlying_ifrs_group_code]
           ,[2019-12-31]
           ,[2020-01-31]
           ,[2020-02-28]
           ,[2020-03-31]
           ,[2020-04-30]
           ,[2020-05-31]
           ,[2020-06-30]
           ,[2020-07-31]
           ,[2020-08-31]
           ,[2020-09-30]
           ,[2020-10-31]
           ,[2020-11-30]
           ,[2020-12-31]
		   ,created_by
		   ,created_date
		   ,last_updated_by
		   ,last_updated_date
		   ,project_id)
select 
case variable_name when 'BEL_B_LIC' then 100 when 'B_ACT_BEL_CUR' then 150 end  as run_number,
'PAA_MB' as ifrs_group_code,
trim(variable_name) as variable_name,
'CAD' as transaction_currency_code,
null as underlying_ifrs_group_code,
[2019-12-31] as [2019-12-31],
null as [2020-01-31],
null as [2020-02-29],
[2019-12-31 - 2020-03-31] as [2020-03-31],
 null as [2020-04-30],
 null as [2020-05-31],
 [2019-12-31 - 2020-06-30] as [2020-06-30],
 null as [2020-07-31],
 null as [2020-08-31],
 [2019-12-31 - 2020-09-30] as [2020-09-30],
 null as [2020-10-31],
 null as [2020-11-30],
 [2019-12-31 - 2020-12-31] as [2020-12-31],
 'Data Factory',
getdate(),
'Data Factory',
getdate(),
project_id
from 
	[raw].[paa_variable_all_run]
where 
	variable_name is not null
	and project_id=@project_id

end

GO
