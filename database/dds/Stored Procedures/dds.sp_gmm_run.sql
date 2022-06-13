create proc [dds].[sp_gmm_run] as 
begin  
truncate table dds.gmm_run
insert into dds.gmm_run  select * from raw.gmm_run
end
GO