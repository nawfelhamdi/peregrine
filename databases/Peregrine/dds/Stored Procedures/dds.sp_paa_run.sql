/****** Object:  StoredProcedure [dds].[sp_paa_run]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dds].[sp_paa_run] as 
begin  
truncate table dds.paa_run
insert into dds.paa_run  select * from raw.paa_run
end
GO
