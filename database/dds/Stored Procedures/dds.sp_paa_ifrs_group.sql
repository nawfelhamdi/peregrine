create proc [dds].[sp_paa_ifrs_group] as 
begin  
truncate table dds.paa_ifrs_group
insert into dds.paa_ifrs_group  select * from raw.paa_ifrs_group
end
GO