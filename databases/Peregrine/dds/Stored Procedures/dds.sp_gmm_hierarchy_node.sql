/****** Object:  StoredProcedure [dds].[sp_gmm_hierarchy_node]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dds].[sp_gmm_hierarchy_node] as 
begin  
truncate table dds.gmm_hierarchy_node
insert into dds.gmm_hierarchy_node  select * from raw.gmm_hierarchy_node
end
GO
