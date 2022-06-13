CREATE TABLE [ctl].[pipeline_data_transfer_log](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pipeline_id] [nvarchar](2000) NOT NULL,
	[pipeline_name] [nvarchar](200) NOT NULL,
	[measurement_model] [nvarchar](10) NOT NULL,
	[source_table_schema] [nvarchar](200) NOT NULL,
	[source_table_name] [nvarchar](200) NOT NULL,
	[target_table_schema] [nvarchar](200) NOT NULL,
	[target_table_name] [nvarchar](200) NOT NULL,
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