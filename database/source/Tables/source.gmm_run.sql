/****** Object:  Table [source].[gmm_run]    Script Date: 2022-06-13 10:24:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [source].[gmm_run](
	[run_number] [int] NULL,
	[description] [nvarchar](1000) NULL,
	[calc_step_code] [nvarchar](200) NULL
) ON [PRIMARY]
GO

