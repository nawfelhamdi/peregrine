import React from 'react';
import heroTexture from '../../../assets/heroTexture.png';
import hero from '../../../assets/hero.png';
import { Link } from 'react-router-dom';

export default function DataLineage() {
  return (
    <div className="px-4 py-16 md:px-16 py-24">
      <div className=" py-10 mx-auto md:max-w-full">
        <div className="relative px-4 py-10 flex flex-col justify-between lg:flex-row bg-[#021F39] rounded-xl shadow-xl items-center">
          <div className="absolute z-0 pr-4 w-full h-full hidden md:block">
            <img src={heroTexture} alt="hero" />
          </div>
          <div className="mb-12 lg:max-w-lg lg:pr-5 lg:mb-0 relative z-10">
            <div className="max-w-xl mb-6 p-8">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-skin-base sm:text-4xl sm:leading-none">
                Data Catalog lineage
              </h2>

              <p className="mb-6 text-base text-white md:text-lg">
                One of the platform features of Microsoft Purview is the ability
                to show the lineage between datasets created by data processes.
                Systems like Data Factory, Data Share, and Power BI capture the
                lineage of data as it moves.
              </p>
              <div>
                <a
                  href="https://web.purview.azure.com/resource/peregrine-testing/main/catalog/entity?guid=c7b59e77-c3f7-4988-84de-af56549f601f&section=lineage&feature.tenant=adb53b4f-b05f-4dcb-a2e1-9111380568c3"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center h-12 px-10
                  font-medium tracking-wide text-garey-700 transition duration-200
                  rounded-md shadow-md bg-skin-button-accent
                  hover:bg-deep-purple-accent-700 focus:shadow-outline
                  focus:outline-none"
                >
                  Browse in Azure Purview
                </a>
              </div>
            </div>
          </div>
          <div className="px-5 pt-6 pb-5 text-center rounded lg:w-2/5">
            <img src={hero} alt="hero" />
          </div>
        </div>
      </div>
    </div>
  );
}
