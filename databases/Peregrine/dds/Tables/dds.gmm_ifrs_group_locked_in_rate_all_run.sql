/****** Object:  Table [dds].[gmm_ifrs_group_locked_in_rate_all_run]    Script Date: 2022-06-07 1:10:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dds].[gmm_ifrs_group_locked_in_rate_all_run](
	[ifrs_group_code] [nvarchar](50) NOT NULL,
	[currency_code] [nvarchar](50) NOT NULL,
	[time_period] [nvarchar](50) NOT NULL,
	[run_number] [int] NULL,
	[2020-09-30] [float] NOT NULL,
	[2020-10-31] [float] NOT NULL,
	[2020-11-30] [float] NOT NULL,
	[2020-12-31] [float] NOT NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO
