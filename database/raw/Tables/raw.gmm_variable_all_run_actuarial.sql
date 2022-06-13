CREATE TABLE [raw].[gmm_variable_all_run_actuarial](
	[run_number] [int] NULL,
	[ifrs_group_code] [nvarchar](1000) NULL,
	[underlying_ifrs_group_code] [nvarchar](1000) NULL,
	[transaction_currency_code] [nvarchar](3) NULL,
	[variable_name] [nvarchar](100) NULL,
	[2020-12-31] [float] NULL,
	[2021-01-31] [float] NULL,
	[2021-02-28] [float] NULL,
	[2021-03-31] [float] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO
