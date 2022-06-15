/****** Object:  Table [ctl].[pipeline_data_transfer_log]    Script Date: 6/15/2022 11:00:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ctl].[pipeline_data_transfer_log](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pipeline_step_log_id] [nvarchar](2000) NOT NULL,
	[source_path] [nvarchar](200) NOT NULL,
	[source_name] [nvarchar](200) NOT NULL,
	[target_path] [nvarchar](200) NOT NULL,
	[target_name] [nvarchar](200) NOT NULL,
	[starting_time] [datetime] NOT NULL,
	[ending_time] [datetime] NULL,
	[rows_read] [int] NULL,
	[rows_copied] [int] NULL,
	[status] [varchar](100) NOT NULL,
	[is_active] [bit] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO
