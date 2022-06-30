const navigation = {
  startproject: [],
  archive: [
    {
      name: 'File Catalog',
      subNavItems: [
        {
          name: 'Input Files',
          url: 'input-files',
        },
        {
          name: 'Output Files',
          url: 'output-files',
        },
        {
          name: 'Reports',
          url: 'reports',
        },
      ],
    },
  ],
  reports: [
    {
      name: 'Reports',
      subNavItems: [
        {
          name: 'Project Reports',
          url: 'project-reports',
        },
      ],
    },
    {
      name: 'BI Dashboards',
      subNavItems: [],
    },
  ],
  data: [
    {
      name: 'Data Governance',
      subNavItems: [
        {
          name: 'Data Profiling',
          url: 'profiling',
        },
        {
          name: 'DQ Dashboard',
          url: 'quality',
        },
      ],
    },
  ],
};

export default navigation;
