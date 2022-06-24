/****** Object:  Table [source].[gmm_variable_all_run_actuarial]    Script Date: 2022-06-13 10:25:04 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [source].[gmm_variable_all_run_actuarial](
	[run_number] [int] NULL,
	[ifrs_group_code] [nvarchar](1000) NULL,
	[underlying_ifrs_group_code] [nvarchar](1000) NULL,
	[transaction_currency_code] [nvarchar](3) NULL,
	[variable_name] [nvarchar](100) NULL,
	[2020-12-31] [float] NULL,
	[2021-01-31] [float] NULL,
	[2021-02-28] [float] NULL,
	[2021-03-31] [float] NULL
) ON [PRIMARY]
GO

