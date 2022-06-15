/****** Object:  StoredProcedure [ctl].[sp_project_update]    Script Date: 6/15/2022 11:00:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [ctl].[sp_project_update] @id int, @moody_project_id int as
begin
update ctl.project
set moody_project_id=@moody_project_id,last_updated_date=dateadd(hour,-4,getdate()),last_updated_by='Data Factory'
where id=@id
end
GO
