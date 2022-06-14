/****** Object:  StoredProcedure [ctl].[sp_pipeline_step_log_update]    Script Date: 2022-06-13 5:41:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [ctl].[sp_pipeline_step_log_update] @id varchar(30),@name varchar(30), @status varchar(100), @data_source varchar(1000)
as
begin

if @status='Running'
	begin
	insert into [ctl].[pipeline_step_log] values(@id,@data_source,@name,dateadd(hour,-4,getdate()),null,@status,1,'Data Factory',dateadd(hour,-4,getdate()),'Data Factory',dateadd(hour,-4,getdate()))
	end
else if @status in ('Success','Failed')
	begin
	update [ctl].[pipeline_step_log]
	set ending_time=dateadd(hour,-4,getdate()),status=@status,is_active=0,last_updated_date=dateadd(hour,-4,getdate()),last_updated_by='Data Factory'
	where pipeline_id=@id
	end

end


GO

