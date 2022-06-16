/****** Object:  Table [raw].[paa_variable_all_run]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [raw].[paa_variable_all_run](
	[id] [int] NULL,
	[variable_name] [nvarchar](100) NULL,
	[definition] [nvarchar](1000) NULL,
	[carrying_amount] [nvarchar](100) NULL,
	[2019-12-31] [float] NULL,
	[2019-12-31 - 2020-03-31] [float] NULL,
	[2019-12-31 - 2020-06-30] [float] NULL,
	[2019-12-31 - 2020-09-30] [float] NULL,
	[2019-12-31 - 2020-12-31] [float] NULL,
	[notes] [nvarchar](1000) NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
