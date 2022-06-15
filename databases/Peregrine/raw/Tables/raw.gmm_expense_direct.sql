CREATE TABLE [raw].[gmm_expense_direct](
	[transaction_id] [int] NULL,
	[transaction_date] [date] NULL,
	[gl_code] [nvarchar](100) NULL,
	[description] [nvarchar](1000) NULL,
	[transaction_amount] [money] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO