/****** Object:  Table [dds].[paa_hierarchy_node]    Script Date: 2022-06-07 1:18:35 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dds].[paa_hierarchy_node](
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

