CREATE TABLE [moody].[reconciliation_report](
	[source] [varchar](256) NULL,
	[type] [varchar](256) NULL,
	[records] [int] NULL,
	[lastUpdatedBy] [varchar](256) NULL,
	[lastUpdatedOn] [datetime] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO