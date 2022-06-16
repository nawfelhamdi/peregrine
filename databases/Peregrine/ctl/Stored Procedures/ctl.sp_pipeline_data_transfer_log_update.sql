/****** Object:  StoredProcedure [ctl].[sp_pipeline_data_transfer_log_update]    Script Date: 6/16/2022 11:56:03 AM ******/
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
@data_read int,
@data_copied int,
@status varchar(100)
as
begin
declare @error_msg nvarchar(1000)=concat('Error occur in data transfer step from ',@source_path,'.',@source_name,' to ',@target_path,'.',@target_name)

if @status='Running'
	begin
	insert into [ctl].[pipeline_data_transfer_log] values(
	@pipeline_step_log_id,
	@source_path,
	@source_name,
	@target_path,
	@target_name,
	getdate(),
	null,
	null,
	null,
	@status,
	1,
	'Data Factory',
	getdate(),
	'Data Factory',
	getdate())
	end				
	
else if @status in ('Success','Failed')													  
	begin

	if @data_read != @data_copied
		begin
		set @status='Failed'
		end

	update [ctl].[pipeline_data_transfer_log]
	set ending_time=getdate(),
	data_read=@data_read,
	data_copied=@data_copied,
	status=@status,
	is_active=0,
	last_updated_date=getdate(),
	last_updated_by='Data Factory'
	where 
	pipeline_step_log_id=@pipeline_step_log_id
	and source_path = @source_path
	and source_name = @source_name
	and target_path = @target_path
	and target_name = @target_name
	end
if @status='Failed' THROW 50000, @error_msg, 1;
end
GO
