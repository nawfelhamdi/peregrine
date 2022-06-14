/****** Object:  Table [source].[paa_hierarchy_node]    Script Date: 2022-06-13 10:25:49 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [source].[paa_hierarchy_node](
	[name] [nvarchar](100) NULL,
	[description] [nvarchar](1000) NULL,
	[currency_code] [nvarchar](5) NULL,
	[hierarchy_node_name] [nvarchar](100) NULL,
	[rank] [int] NULL,
	[reporting_entity] [nvarchar](5) NULL
) ON [PRIMARY]
GO

