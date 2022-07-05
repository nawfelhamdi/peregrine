const navigation = {
  startproject: [],
  archive: [
    {
      name: 'File Catalog',
      url: 'file-catalog',
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
  data: [
    {
      name: 'Data Governance',
      url: '#',
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
