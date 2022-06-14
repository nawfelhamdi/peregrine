create proc [dds].[sp_gmm_portfolio] as 
begin  
truncate table dds.gmm_portfolio
insert into dds.gmm_portfolio  select * from raw.gmm_portfolio
end
GO