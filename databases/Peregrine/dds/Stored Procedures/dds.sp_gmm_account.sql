/****** Object:  StoredProcedure [dds].[sp_gmm_account]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dds].[sp_gmm_account] as 
begin  
truncate table dds.gmm_account
insert into dds.gmm_account  select * from raw.gmm_account
end
GO
