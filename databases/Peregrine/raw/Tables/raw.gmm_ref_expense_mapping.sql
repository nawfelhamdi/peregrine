/****** Object:  Table [raw].[gmm_ref_expense_mapping]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [raw].[gmm_ref_expense_mapping](
	[gl_code] [nvarchar](100) NULL,
	[status] [nvarchar](100) NULL,
	[particulars] [nvarchar](1000) NULL,
	[classification] [nvarchar](1000) NULL,
	[ey_remarks] [nvarchar](100) NULL,
	[directly_attributable] [nvarchar](100) NULL,
	[If yes, please select an option from the drop list] [nvarchar](1000) NULL,
	[insurance_acquistion_cashflow] [float] NULL,
	[claim_handling_cost] [float] NULL,
	[policy_administration_and_maintenance] [float] NULL,
	[overheads] [nvarchar](1000) NULL,
	[investment_expense] [nvarchar](1000) NULL,
	[Other (includes taxes)] [nvarchar](1000) NULL,
	[ifrs9_expenses] [nvarchar](1000) NULL,
	[ifrs15_expenses] [nvarchar](1000) NULL,
	[other_expenses] [nvarchar](1000) NULL,
	[check_total] [nvarchar](100) NULL,
	[Abnormal/expense labour and related costs] [nvarchar](1000) NULL,
	[Allocation across the expense catergories] [nvarchar](1000) NULL,
	[Insurance acquistion cashflow metric: - Allocation to current and future groups] [nvarchar](1000) NULL,
	[Disaggregation down to groups of insurance contract] [nvarchar](1000) NULL,
	[Is it a PAA insurance acquisition expense] [nvarchar](1000) NULL,
	[Remarks (if any)] [nvarchar](1000) NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
