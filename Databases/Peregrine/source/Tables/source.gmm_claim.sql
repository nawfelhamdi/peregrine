CREATE TABLE [source].[gmm_claim](
	[policy_number] [int] NULL,
	[action_date] [date] NULL,
	[notice_date] [date] NULL,
	[event_date] [date] NULL,
	[description] [nvarchar](1000) NULL,
	[claim_amt] [float] NULL,
	[os_prem] [float] NULL,
	[os_loan] [float] NULL,
	[retention] [float] NULL,
	[claim_type] [nvarchar](1) NULL
) ON [PRIMARY]
GO