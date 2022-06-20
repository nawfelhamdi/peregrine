/****** Object:  StoredProcedure [dds].[sp_gmm_account]    Script Date: 6/20/2022 4:25:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dds].[sp_gmm_account] @project_id int as 
begin  
delete from dds.gmm_account where project_id=@project_id
insert into dds.gmm_account select * from raw.gmm_account where project_id=@project_id
end
GO
