/****** Object:  Table [dds].[paa_account]    Script Date: 2022-06-07 1:18:18 PM ******/
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
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO

