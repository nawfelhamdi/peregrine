/****** Object:  Table [ctl].[pipeline_step_log]    Script Date: 2022-06-13 5:38:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [ctl].[pipeline_step_log](
	[pipeline_id] [nvarchar](max) NULL,
	[data_source] [varchar](max) NULL,
	[pipeline_name] [varchar](max) NULL,
	[starting_time] [datetime] NOT NULL,
	[ending_time] [datetime] NULL,
	[status] [varchar](100) NOT NULL,
	[is_active] [bit] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
