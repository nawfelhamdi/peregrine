CREATE TABLE [moody].[claim](
	[id] [int] NOT NULL,
	[portfolio] [nvarchar](50) NOT NULL,
	[amounts] [nvarchar](50) NOT NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO