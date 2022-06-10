/****** Object:  Table [dds].[gmm_portfolio]    Script Date: 2022-06-07 1:11:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dds].[gmm_portfolio](
	[name] [nvarchar](100) NULL,
	[description] [nvarchar](1000) NULL,
	[accounting_policy] [nvarchar](10) NULL,
	[product_type_code] [nvarchar](100) NULL,
	[unmodeled_business] [nvarchar](5) NULL,
	[valuation_method] [nvarchar](10) NULL,
	[ira_lrc_calculation] [nvarchar](5) NULL,
	[ilrc_calculation] [nvarchar](5) NULL,
	[ilic_calculation] [nvarchar](5) NULL,
	[reinsurance_held] [nvarchar](5) NULL,
	[ira_lic_calculation] [nvarchar](5) NULL,
	[modified_gmm] [nvarchar](5) NULL,
	[vfa_approach] [nvarchar](10) NULL,
	[lrecc_method] [nvarchar](100) NULL
) ON [PRIMARY]
GO

