/****** Object:  Table [moody].[reconciliation_report]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [moody].[reconciliation_report](
	[source] [varchar](256) NULL,
	[type] [varchar](256) NULL,
	[records] [int] NULL,
	[lastUpdatedBy] [varchar](256) NULL,
	[lastUpdatedOn] [datetime] NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
