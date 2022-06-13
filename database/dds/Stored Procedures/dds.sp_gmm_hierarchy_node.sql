create proc [dds].[sp_gmm_hierarchy_node] as 
begin  
truncate table dds.gmm_hierarchy_node
insert into dds.gmm_hierarchy_node  select * from raw.gmm_hierarchy_node
end
GO

