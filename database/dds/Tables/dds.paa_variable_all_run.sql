/****** Object:  Table [dds].[paa_variable_all_run]    Script Date: 2022-06-07 3:40:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dds].[paa_variable_all_run](
	[run_number] [int] NULL,
	[ifrs_group_code] [varchar](20) NOT NULL,
	[variable_name] [nvarchar](100) NOT NULL,
	[transaction_currency_code] [varchar](10) NOT NULL,
	[underlying_ifrs_group_code] [int] NULL,
	[2019-12-31] [float] NULL,
	[2020-01-31] [float] NULL,
	[2020-02-28] [float] NULL,
	[2020-03-31] [float] NULL,
	[2020-04-30] [float] NULL,
	[2020-05-31] [float] NULL,
	[2020-06-30] [float] NULL,
	[2020-07-31] [float] NULL,
	[2020-08-31] [float] NULL,
	[2020-09-30] [float] NULL,
	[2020-10-31] [float] NULL,
	[2020-11-30] [float] NULL,
	[2020-12-31] [float] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO

