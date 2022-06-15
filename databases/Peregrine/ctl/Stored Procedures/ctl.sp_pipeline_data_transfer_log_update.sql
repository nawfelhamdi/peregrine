/****** Object:  StoredProcedure [ctl].[sp_pipeline_data_transfer_log_update]    Script Date: 6/15/2022 11:00:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [ctl].[sp_pipeline_data_transfer_log_update] 
@pipeline_step_log_id varchar(2000),
@source_path varchar(100),
@source_name varchar(100),
@target_path varchar(100),
@target_name varchar(100),
@rows_read int,
@rows_copied int,
@status varchar(100)
as
begin

if @status='Running'
	begin
	insert into [ctl].[pipeline_data_transfer_log] values(
	@pipeline_step_log_id,
	@source_path,
	@source_name,
	@target_path,
	@target_name,
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
	pipeline_step_log_id=@pipeline_step_log_id
	and source_path = @source_path
	and source_name = @source_name
	and target_path = @target_path
	and target_name = @target_name
	end

end
GO
