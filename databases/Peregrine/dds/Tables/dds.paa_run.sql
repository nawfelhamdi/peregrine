/****** Object:  Table [dds].[paa_run]    Script Date: 2022-06-07 3:36:29 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dds].[paa_run](
	[run_number] [int] NULL,
	[description] [nvarchar](1000) NULL,
	[calc_step_code] [nvarchar](200) NULL,
	[created_by] [varchar](500) NULL,
	[created_date] [datetime] NULL,
	[last_updated_by] [varchar](500) NULL,
	[last_updated_date] [datetime] NULL
) ON [PRIMARY]
GO

