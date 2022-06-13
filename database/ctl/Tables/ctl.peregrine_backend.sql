CREATE TABLE [ctl].[peregrine_backend](
	[id] [int] NOT NULL,
	[measurement_model] [varchar](500) NULL,
	[start_date] [date] NULL,
	[end_date] [date] NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL,
	[project_name] [varchar](500) NULL,
	[project_id] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
