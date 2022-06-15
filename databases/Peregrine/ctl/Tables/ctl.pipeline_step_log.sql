/****** Object:  Table [ctl].[pipeline_step_log]    Script Date: 6/15/2022 11:00:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ctl].[pipeline_step_log](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pipeline_log_id] [int] NULL,
	[data_source] [varchar](1000) NULL,
	[pipeline_name] [varchar](1000) NULL,
	[starting_time] [datetime] NOT NULL,
	[ending_time] [datetime] NULL,
	[status] [varchar](100) NOT NULL,
	[is_active] [bit] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO
