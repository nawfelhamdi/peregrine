/****** Object:  Table [dds].[paa_hierarchy_node]    Script Date: 6/20/2022 4:25:27 PM ******/
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
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL,
	[project_id] [int] NULL
) ON [PRIMARY]
GO
