CREATE TABLE [ctl].[control_table_parameter](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pipeline_name] [nvarchar](200) NOT NULL,
	[measurement_model] [nvarchar](10) NOT NULL,
	[source_table_schema] [nvarchar](200) NOT NULL,
	[source_table_name] [nvarchar](200) NOT NULL,
	[target_table_schema] [nvarchar](200) NOT NULL,
	[target_table_name] [nvarchar](200) NOT NULL,
	[stored_procedure] [nvarchar](200) NULL,
	[system_parameter] [nvarchar](4000) NULL,
	[loading_mode] [nvarchar](1) NOT NULL,
	[active_flag] [nvarchar](1) NOT NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO