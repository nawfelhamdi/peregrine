/****** Object:  Table [moody].[claim]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [moody].[claim](
	[id] [int] NOT NULL,
	[portfolio] [nvarchar](50) NOT NULL,
	[amounts] [nvarchar](50) NOT NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
