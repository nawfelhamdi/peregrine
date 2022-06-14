create proc [dds].[sp_paa_account] as 
begin  
truncate table dds.paa_account
insert into dds.paa_account  select * from raw.paa_account
end
GO