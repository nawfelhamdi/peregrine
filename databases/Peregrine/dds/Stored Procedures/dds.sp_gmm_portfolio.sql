/****** Object:  StoredProcedure [dds].[sp_gmm_portfolio]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dds].[sp_gmm_portfolio] as 
begin  
truncate table dds.gmm_portfolio
insert into dds.gmm_portfolio  select * from raw.gmm_portfolio
end
GO
