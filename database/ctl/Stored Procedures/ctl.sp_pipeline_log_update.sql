create procedure [ctl].[sp_pipeline_log_update] @id varchar(30),@name varchar(30), @status varchar(100), @dataSource varchar(1000)
as
begin

if @status='Running'
	begin
	insert into [ctl].[pipeline_log] values(@id,@dataSource,@name,dateadd(hour,-4,getdate()),null,@status,1,'Data Factory',dateadd(hour,-4,getdate()),'Data Factory',dateadd(hour,-4,getdate()))
	end
else if @status in ('Success','Failed')
	begin
	update [ctl].[pipeline_log]
	set ending_time=dateadd(hour,-4,getdate()),status=@status,is_active=0,last_updated_date=dateadd(hour,-4,getdate()),last_updated_by='Data Factory'
	where pipeline_id=@id
	end

end


GO
