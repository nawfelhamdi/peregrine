import React from 'react';

export default function Footer() {
  return (
    <div className="bg-skin-base md:absolute md:bottom-0 w-full">
      <div className="px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex flex-col items-center justify-between py-8 sm:flex-row">
          <div className="text-skin-muted opacity-90 flex mb-4 md:mb-0 items-center space-x-4 sm:mt-0 justify-center md:justify-start">
            <a
              href="/"
              className="transition-colors duration-300 hover:text-teal-accent-400"
            >
              Propriety Rights
            </a>
            <a
              href="/"
              className="transition-colors duration-300 hover:text-teal-accent-400"
            >
              Policy
            </a>
            <a
              href="/"
              className="transition-colors duration-300 hover:text-teal-accent-400"
            >
              Terms of Use
            </a>
          </div>
          <p className="text-skin-muted opacity-90 text-sm text-center md:text-start">
            © Copyright 2022 Peregrine. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
