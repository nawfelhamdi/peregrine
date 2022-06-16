/****** Object:  Table [ctl].[control_table_parameter]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ctl].[control_table_parameter](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pipeline_name] [nvarchar](200) NOT NULL,
	[measurement_model] [nvarchar](10) NOT NULL,
	[source_path] [nvarchar](200) NOT NULL,
	[source_name] [nvarchar](200) NOT NULL,
	[target_path] [nvarchar](200) NOT NULL,
	[target_name] [nvarchar](200) NOT NULL,
	[stored_procedure] [nvarchar](200) NULL,
	[system_parameter] [nvarchar](4000) NULL,
	[loading_mode] [nvarchar](1) NOT NULL,
	[active_flag] [nvarchar](1) NOT NULL,
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
ALTER TABLE [ctl].[control_table_parameter] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [ctl].[control_table_parameter] ADD  DEFAULT (getdate()) FOR [last_updated_date]
GO
