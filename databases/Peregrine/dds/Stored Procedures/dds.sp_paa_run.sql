/****** Object:  StoredProcedure [dds].[sp_paa_run]    Script Date: 6/20/2022 4:25:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dds].[sp_paa_run] @project_id int as 
begin  
delete from dds.paa_run where project_id=@project_id
insert into dds.paa_run select * from raw.paa_run where project_id=@project_id
end
GO
