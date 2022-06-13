create proc [dds].[sp_gmm_account] as 
begin  
truncate table dds.gmm_account
insert into dds.gmm_account  select * from raw.gmm_account
end
GO