create proc [dds].[sp_paa_portfolio] as 
begin  
truncate table dds.paa_portfolio
insert into dds.paa_portfolio  select * from raw.paa_portfolio
end
GO