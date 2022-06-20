/****** Object:  StoredProcedure [dds].[sp_gmm_ifrs_group_locked_in_rate_all_run]    Script Date: 6/20/2022 4:25:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dds].[sp_gmm_ifrs_group_locked_in_rate_all_run] @project_id int as 
begin  
delete from dds.gmm_ifrs_group_locked_in_rate_all_run where project_id=@project_id
insert into dds.gmm_ifrs_group_locked_in_rate_all_run select * from raw.gmm_ifrs_group_locked_in_rate_all_run where project_id=@project_id
end
GO
