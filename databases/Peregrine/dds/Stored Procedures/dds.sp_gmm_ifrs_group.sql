create proc [dds].[sp_gmm_ifrs_group] as 
begin  
truncate table dds.gmm_ifrs_group
insert into dds.gmm_ifrs_group  select * from raw.gmm_ifrs_group
end
GO