/****** Object:  Table [dds].[gmm_variable_all_run]    Script Date: 6/20/2022 4:25:27 PM ******/
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
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL,
	[project_id] [int] NULL
) ON [PRIMARY]
GO
