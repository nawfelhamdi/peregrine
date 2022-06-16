/****** Object:  Table [raw].[gmm_premium]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
