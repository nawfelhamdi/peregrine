/****** Object:  Table [source].[gmm_premium]    Script Date: 2022-06-13 10:24:29 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [source].[gmm_premium](
	[policy_number] [int] NULL,
	[transaction_type] [nvarchar](1000) NULL,
	[gross_payment] [float] NULL,
	[banking_date] [date] NULL
) ON [PRIMARY]
GO

