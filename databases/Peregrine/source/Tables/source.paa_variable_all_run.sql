/****** Object:  Table [source].[paa_variable_all_run]    Script Date: 2022-06-13 10:27:09 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [source].[paa_variable_all_run](
	[id] [int] NULL,
	[variable_name] [nvarchar](100) NULL,
	[definition] [nvarchar](1000) NULL,
	[carrying_amount] [nvarchar](100) NULL,
	[2019-12-31] [float] NULL,
	[2019-12-31 - 2020-03-31] [float] NULL,
	[2019-12-31 - 2020-06-30] [float] NULL,
	[2019-12-31 - 2020-09-30] [float] NULL,
	[2019-12-31 - 2020-12-31] [float] NULL,
	[notes] [nvarchar](1000) NULL
) ON [PRIMARY]
GO

