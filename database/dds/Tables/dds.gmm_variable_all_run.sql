/****** Object:  Table [dds].[gmm_variable_all_run]    Script Date: 2022-06-07 1:17:35 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dds].[gmm_variable_all_run](
	[run_number] [int] NULL,
	[ifrs_group_code] [nvarchar](1000) NULL,
	[underlying_ifrs_group_code] [nvarchar](1000) NULL,
	[transaction_currency_code] [nvarchar](3) NULL,
	[variable_name] [nvarchar](100) NULL,
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

