/****** Object:  StoredProcedure [ctl].[sp_pipeline_step_log_update]    Script Date: 6/16/2022 12:24:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [ctl].[sp_pipeline_step_log_update] @id varchar(30),@name varchar(30), @status varchar(100), @data_source varchar(1000)
as
begin
declare @error_msg nvarchar(1000)=concat('Error occur in pipeline step ',@name)
if @status='Running'
	begin
	insert into [ctl].[pipeline_step_log] values(@id,@data_source,@name,getdate(),null,@status,1,'Data Factory',getdate(),'Data Factory',getdate())
	end
else if @status in ('Success','Failed')
	begin
	update [ctl].[pipeline_step_log]
	set ending_time=getdate(),status=@status,is_active=0,last_updated_date=getdate(),last_updated_by='Data Factory'
	where pipeline_log_id=@id
	and pipeline_name=@name
	end
if @status='Failed' THROW 50000, @error_msg, 1;
end
Go
