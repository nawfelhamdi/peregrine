import React from 'react';
import { Link } from 'react-router-dom';
import Item from './components/Item';

const termsOfUseContent = [
  {
    id: 1,
    details: [
      {
        id: 1,
        subTitle: '1. Introduction V:2.0.6',
        paragraphs: [
          'This Privacy Notice is intended to describe the practices EY follows in relation to the Unily Enterprise Intranet (“Tool”) with respect to the privacy of all individuals whose personal data is processed and stored in the Tool.',
        ],
      },
      {
        id: 2,
        subTitle: '2. Who manages the Tool?',
        paragraphs: [
          'EY” refers to one or more of the member firms of Ernst & Young Global Limited (“EYG”), each of which is a separate legal entity and can act as a data controller in its own right. The entity that is acting as data controller by providing this Tool on which your personal data will be processed and stored is EY Global Services Limited. EY Global Services Limited licenses the Tool from Bright Starr Limited trading as Unily, The Granary, Abbey Mill Business Park, Lower Eashing, Godalming GU7 2QW.',
          'The personal data in the Tool is shared by EY Global Services Limited with one or more member firms of EYG (see “Who can access your personal data” section below).',
          'The Tool is hosted on servers in MS Azure Primary Data Centres:  Dublin, Ireland (North Europe) & Amsterdam, Netherlands (West Europe).',
        ],
      },
    ],
  },
];

export default function Privacy() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:py-20">
      <Link to="/">
        <button className="inline-flex mb-8 items-start justify-between uppercase h-6 y-3 font-semibold tracking-wide text-[#939393] transition duration-200 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </button>
      </Link>
      <h1 className="text-2xl font-black leading-none sm:text-3xl xl:text-4xl mb-10">
        Term of use Notice
      </h1>
      <div className="mb-10 border-t border-b divide-y py-8">
        {termsOfUseContent.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
