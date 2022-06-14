
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [ctl].[project](
    [id] [int] NOT NULL IDENTITY(1,1),
    [project_name] [varchar](500) NOT NULL,
    [moody_project_id] [varchar](100) NULL,
    [measurement_model] [varchar](20) NULL,
    [start_date] [date] NULL,
    [end_date] [date] NULL,
    [created_by] [varchar](500) NULL,
    [created_date] [datetime] NULL,
    [last_updated_by] [varchar](500) NULL,
    [last_updated_date] [datetime] NULL,
    PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
GO

