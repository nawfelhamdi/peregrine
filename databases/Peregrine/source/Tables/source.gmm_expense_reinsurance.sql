/****** Object:  Table [source].[gmm_expense_reinsurance]    Script Date: 2022-06-13 10:21:24 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [source].[gmm_expense_reinsurance](
	[transaction_id] [int] NULL,
	[transaction_date] [date] NULL,
	[gl_code] [nvarchar](100) NULL,
	[description] [nvarchar](1000) NULL,
	[transaction_amount] [money] NULL
) ON [PRIMARY]
GO

