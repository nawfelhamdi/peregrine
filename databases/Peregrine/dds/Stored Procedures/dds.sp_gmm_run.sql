/****** Object:  StoredProcedure [dds].[sp_gmm_run]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dds].[sp_gmm_run] as 
begin  
truncate table dds.gmm_run
insert into dds.gmm_run  select * from raw.gmm_run
end
GO
