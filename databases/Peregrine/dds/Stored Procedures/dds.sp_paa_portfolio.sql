/****** Object:  StoredProcedure [dds].[sp_paa_portfolio]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dds].[sp_paa_portfolio] as 
begin  
truncate table dds.paa_portfolio
insert into dds.paa_portfolio  select * from raw.paa_portfolio
end
GO
