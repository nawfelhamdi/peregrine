/****** Object:  StoredProcedure [dds].[sp_paa_hierarchy_node]    Script Date: 6/20/2022 4:25:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dds].[sp_paa_hierarchy_node] @project_id int as 
begin  
delete from dds.paa_hierarchy_node where project_id=@project_id
insert into dds.paa_hierarchy_node select * from raw.paa_hierarchy_node where project_id=@project_id
end
GO
