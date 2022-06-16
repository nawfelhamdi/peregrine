/****** Object:  Table [raw].[paa_run]    Script Date: 6/16/2022 11:56:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [raw].[paa_run](
	[run_number] [int] NULL,
	[description] [nvarchar](1000) NULL,
	[calc_step_code] [nvarchar](200) NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_date] [datetime2](7) NOT NULL,
	[last_updated_by] [nvarchar](255) NOT NULL,
	[last_updated_date] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
