CREATE TABLE [raw].[gmm_hierarchy_node](
	[name] [nvarchar](100) NULL,
	[description] [nvarchar](1000) NULL,
	[currency_code] [nvarchar](5) NULL,
	[hierarchy_node_name] [nvarchar](100) NULL,
	[rank] [int] NULL,
	[reporting_entity] [nvarchar](5) NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO