/****** Object:  StoredProcedure [dds].[sp_paa_account]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dds].[sp_paa_account] as 
begin  
truncate table dds.paa_account
insert into dds.paa_account  select * from raw.paa_account
end
GO
