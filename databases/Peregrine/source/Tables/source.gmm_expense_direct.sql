CREATE TABLE [source].[gmm_expense_direct](
	[transaction_id] [int] NULL,
	[transaction_date] [date] NULL,
	[gl_code] [nvarchar](100) NULL,
	[description] [nvarchar](1000) NULL,
	[transaction_amount] [money] NULL
) ON [PRIMARY]
GO