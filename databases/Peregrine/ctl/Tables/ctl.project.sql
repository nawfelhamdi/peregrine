/****** Object:  Table [ctl].[project]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [ctl].[project](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[project_name] [nvarchar](255) NOT NULL,
	[moody_project_id] [nvarchar](255) NOT NULL,
	[measurement_model] [nvarchar](255) NOT NULL,
	[start_date] [datetime] NOT NULL,
	[end_date] [datetime] NOT NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_4d68b1358bb5b766d3e78f32f57] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [ctl].[project] ADD  CONSTRAINT [DF_676098f73dccf6fcb324ce7a465]  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [ctl].[project] ADD  CONSTRAINT [DF_36cba8ebc82be216f1ec71edf3e]  DEFAULT (getdate()) FOR [last_updated_date]
GO
