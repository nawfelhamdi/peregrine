/****** Object:  Table [source].[gmm_ifrs_group_locked_in_rate_all_run]    Script Date: 2022-06-13 10:23:40 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [source].[gmm_ifrs_group_locked_in_rate_all_run](
	[ifrs_group_code] [nvarchar](50) NOT NULL,
	[currency_code] [nvarchar](50) NOT NULL,
	[time_period] [nvarchar](50) NOT NULL,
	[run_number] [int] NULL,
	[2020-09-30] [float] NOT NULL,
	[2020-10-31] [float] NOT NULL,
	[2020-11-30] [float] NOT NULL,
	[2020-12-31] [float] NOT NULL
) ON [PRIMARY]
GO

