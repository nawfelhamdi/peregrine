/****** Object:  Table [raw].[gmm_premium]    Script Date: 6/20/2022 4:25:28 PM ******/
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
	[last_updated_date] [datetime] NULL,
	[project_id] [int] NULL
) ON [PRIMARY]
GO
