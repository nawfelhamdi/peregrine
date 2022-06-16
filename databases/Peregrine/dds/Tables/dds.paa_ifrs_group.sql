/****** Object:  Table [dds].[paa_ifrs_group]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dds].[paa_ifrs_group](
	[code] [nvarchar](100) NULL,
	[portfolio_name] [nvarchar](100) NULL,
	[hierarchy_node_name] [nvarchar](100) NULL,
	[country_code] [nvarchar](10) NULL,
	[group_type] [nvarchar](100) NULL,
	[reinsurance_type] [nvarchar](100) NULL,
	[source] [nvarchar](100) NULL,
	[cohort] [nvarchar](100) NULL,
	[transition_method] [nvarchar](100) NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
