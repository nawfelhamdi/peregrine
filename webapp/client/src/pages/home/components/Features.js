import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    id: 1,
    title: 'Start Project',
    description: 'Initiate an IFRS 17 project calculation run',
    href: 'start-project/start',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-skin-base"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Archive',
    description: 'Access past projects and data',
    href: 'archive/files',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-skin-base"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Reports',
    description: "View the output folder of Moody's RI",
    href: 'reports',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-skin-base"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

const FeatureCard = ({ feature: { title, description, icon, href } }) => {
  return (
    <Link to={href}>
      <div className="text-center p-4 duration-300 transform bg-white hover:bg-skin-base hover:text-skin-muted border rounded shadow-sm hover:-translate-y-2 py-12">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-skin-base">
          {icon}
        </div>
        <h6 className="text-center mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
          {title}
        </h6>
        <p className="mb-2 opacity-90">{description}</p>
      </div>
    </Link>
  );
};
export default function Features() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:py-32">
      <div className="grid gap-5 row-gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  );
}
