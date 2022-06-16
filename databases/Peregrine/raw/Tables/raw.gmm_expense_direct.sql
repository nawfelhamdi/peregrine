/****** Object:  Table [raw].[gmm_expense_direct]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
