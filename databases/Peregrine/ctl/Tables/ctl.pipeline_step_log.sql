/****** Object:  Table [ctl].[pipeline_step_log]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ctl].[pipeline_step_log](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pipeline_log_id] [int] NOT NULL,
	[data_source] [nvarchar](1000) NOT NULL,
	[pipeline_name] [nvarchar](1000) NOT NULL,
	[starting_time] [datetime2](7) NOT NULL,
	[ending_time] [datetime2](7) NULL,
	[status] [nvarchar](100) NOT NULL,
	[is_active] [bit] NOT NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [ctl].[pipeline_step_log] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [ctl].[pipeline_step_log] ADD  DEFAULT (getdate()) FOR [last_updated_date]
GO
