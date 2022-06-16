/****** Object:  Table [moody].[output_variable]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [moody].[output_variable](
	[run_number] [int] NULL,
	[ifrs_group] [varchar](256) NULL,
	[variable_name] [varchar](256) NULL,
	[calc_step_code] [varchar](256) NULL,
	[underlying_ifrs_group_code] [int] NULL,
	[process_step] [varchar](256) NULL,
	[transaction_currency_code] [varchar](256) NULL,
	[functional_currency_code] [varchar](256) NULL,
	[custom_dim_1] [varchar](256) NULL,
	[custom_dim_2] [varchar](256) NULL,
	[fcf_component] [varchar](256) NULL,
	[2019-12-31] [float] NULL,
	[2020-01-31] [float] NULL,
	[2020-02-31] [float] NULL,
	[2020-03-31] [float] NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
