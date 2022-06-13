CREATE TABLE [raw].[gmm_portfolio](
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
	[lrecc_method] [nvarchar](100) NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO