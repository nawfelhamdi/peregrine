/****** Object:  Table [raw].[gmm_ifrs_group_locked_in_rate_all_run]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [raw].[gmm_ifrs_group_locked_in_rate_all_run](
	[ifrs_group_code] [nvarchar](50) NOT NULL,
	[currency_code] [nvarchar](50) NOT NULL,
	[time_period] [nvarchar](50) NOT NULL,
	[run_number] [int] NULL,
	[2020-09-30] [float] NOT NULL,
	[2020-10-31] [float] NOT NULL,
	[2020-11-30] [float] NOT NULL,
	[2020-12-31] [float] NOT NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
