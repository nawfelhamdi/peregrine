/****** Object:  StoredProcedure [dds].[sp_paa_ifrs_group]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dds].[sp_paa_ifrs_group] as 
begin  
truncate table dds.paa_ifrs_group
insert into dds.paa_ifrs_group  select * from raw.paa_ifrs_group
end
GO
