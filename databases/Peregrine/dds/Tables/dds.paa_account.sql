/****** Object:  Table [dds].[paa_account]    Script Date: 6/20/2022 4:25:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dds].[paa_account](
	[hierarchy_node_name] [nvarchar](100) NULL,
	[code] [bigint] NULL,
	[description] [nvarchar](1000) NULL,
	[master_account_type] [nvarchar](100) NULL,
	[master_account_code] [int] NULL,
	[master_section] [nvarchar](10) NULL,
	[master_direct_rch] [nvarchar](10) NULL,
	[master_valuation_method] [nvarchar](10) NULL,
	[master_component] [nvarchar](100) NULL,
	[master_sub_component] [nvarchar](100) NULL,
	[master_lrc_lic_and_onerousness] [nvarchar](10) NULL,
	[master_movement] [nvarchar](100) NULL,
	[master_sub_movement_1] [nvarchar](100) NULL,
	[master_sub_movement_2] [nvarchar](100) NULL,
	[master_account_deprecated_at_version] [nvarchar](100) NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL,
	[project_id] [int] NULL
) ON [PRIMARY]
GO
