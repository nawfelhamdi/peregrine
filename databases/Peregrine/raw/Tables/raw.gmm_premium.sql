CREATE TABLE [raw].[gmm_premium](
	[policy_number] [int] NULL,
	[transaction_type] [nvarchar](1000) NULL,
	[gross_payment] [float] NULL,
	[banking_date] [date] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO
