/****** Object:  StoredProcedure [ctl].[sp_pipeline_data_transfer_log_update]    Script Date: 2022-06-13 5:41:26 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--select * from [ctl].[peregrine_backend]

--select * from [ctl].[pipeline_log]
--order by last_updated_date desc

--select * from ctl.control_table_parameter

--select * from [ctl].[pipeline_data_transfer_log]


create proc [ctl].[sp_pipeline_data_transfer_log_update] 
@pipeline_id varchar(2000),
@pipeline_name varchar(100),
@measurement_model varchar(3),
@source_table_schema varchar(100),
@source_table_name varchar(100),
@target_table_schema varchar(100),
@target_table_name varchar(100),
@rows_read int,
@rows_copied int,
@status varchar(100)
as
begin

if @status='Running'
	begin
	insert into [ctl].[pipeline_data_transfer_log] values(
	@pipeline_id,
	@pipeline_name,
	@measurement_model,
	@source_table_schema,
	@source_table_name,
	@target_table_schema,
	@target_table_name,
	dateadd(hour,-4,getdate()),
	null,
	null,
	null,
	@status,
	1,
	'Data Factory',
	dateadd(hour,-4,getdate()),
	'Data Factory',
	dateadd(hour,-4,getdate()))
	end				
	
else if @status in ('Success','Failed')													  
	begin

	if @rows_read != @rows_copied
		begin
		set @status='Failed'
		end

	update [ctl].[pipeline_data_transfer_log]
	set ending_time=dateadd(hour,-4,getdate()),
	rows_read=@rows_read,
	rows_copied=@rows_copied,
	status=@status,
	is_active=0,
	last_updated_date=dateadd(hour,-4,getdate()),
	last_updated_by='Data Factory'
	where 
	pipeline_id=@pipeline_id
	and @source_table_schema = source_table_schema
	and @source_table_name = source_table_name
	and @target_table_schema = target_table_schema
	and @target_table_name = target_table_name
	end

end
GO