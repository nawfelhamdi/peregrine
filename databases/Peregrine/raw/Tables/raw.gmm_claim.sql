/****** Object:  Table [raw].[gmm_claim]    Script Date: 6/20/2022 4:25:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [raw].[gmm_claim](
	[policy_number] [int] NULL,
	[action_date] [date] NULL,
	[notice_date] [date] NULL,
	[event_date] [date] NULL,
	[description] [nvarchar](1000) NULL,
	[claim_amt] [float] NULL,
	[os_prem] [float] NULL,
	[os_loan] [float] NULL,
	[retention] [float] NULL,
	[claim_type] [nvarchar](1) NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL,
	[project_id] [int] NULL
) ON [PRIMARY]
GO
