/****** Object:  Table [dds].[gmm_run]    Script Date: 2022-06-07 1:12:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dds].[gmm_run](
	[run_number] [int] NULL,
	[description] [nvarchar](1000) NULL,
	[calc_step_code] [nvarchar](200) NULL
) ON [PRIMARY]
GO

