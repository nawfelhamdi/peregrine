/****** Object:  StoredProcedure [dds].[sp_gmm_ifrs_group_locked_in_rate_all_run]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dds].[sp_gmm_ifrs_group_locked_in_rate_all_run] as 
begin  
truncate table dds.gmm_ifrs_group_locked_in_rate_all_run
insert into dds.gmm_ifrs_group_locked_in_rate_all_run  select * from raw.gmm_ifrs_group_locked_in_rate_all_run
end
GO
