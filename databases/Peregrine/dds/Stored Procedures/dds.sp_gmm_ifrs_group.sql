/****** Object:  StoredProcedure [dds].[sp_gmm_ifrs_group]    Script Date: 6/20/2022 4:25:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dds].[sp_gmm_ifrs_group] @project_id int as 
begin  
delete from dds.gmm_ifrs_group where project_id=@project_id
insert into dds.gmm_ifrs_group select * from raw.gmm_ifrs_group where project_id=@project_id
end
GO
