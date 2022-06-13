/****** Object:  Table [dds].[gmm_ifrs_group]    Script Date: 2022-06-07 1:09:27 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dds].[gmm_ifrs_group](
	[code] [nvarchar](100) NULL,
	[portfolio_name] [nvarchar](100) NULL,
	[hierarchy_node_name] [nvarchar](100) NULL,
	[country_code] [nvarchar](10) NULL,
	[group_type] [nvarchar](100) NULL,
	[reinsurance_type] [nvarchar](100) NULL,
	[source] [nvarchar](100) NULL,
	[cohort] [nvarchar](100) NULL,
	[transition_method] [nvarchar](100) NULL
) ON [PRIMARY]
GO

