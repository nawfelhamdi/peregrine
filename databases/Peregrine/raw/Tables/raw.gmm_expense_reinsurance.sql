/****** Object:  Table [raw].[gmm_expense_reinsurance]    Script Date: 6/20/2022 4:25:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [raw].[gmm_expense_reinsurance](
	[transaction_id] [int] NULL,
	[transaction_date] [date] NULL,
	[gl_code] [nvarchar](100) NULL,
	[description] [nvarchar](1000) NULL,
	[transaction_amount] [money] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL,
	[project_id] [int] NULL
) ON [PRIMARY]
GO
