create proc [dds].[sp_paa_hierarchy_node] as 
begin  
truncate table dds.paa_hierarchy_node
insert into dds.paa_hierarchy_node  select * from raw.paa_hierarchy_node
end
GO