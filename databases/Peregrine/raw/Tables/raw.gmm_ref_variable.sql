CREATE TABLE [raw].[gmm_ref_variable](
	[source] [nvarchar](100) NULL,
	[transaction_type] [nvarchar](1000) NULL,
	[ri_variable] [nvarchar](100) NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO