import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../../shareds/Footer';
import logo from '../../assets/logo.png';
import Main from './components/Main';

export default function Auth() {
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link
              to="/"
              aria-label="Company"
              title="Company"
              className="flex items-center justify-center"
            >
              <img src={logo} className="w-[100px] h-[100px]" alt="Peregrine" />
            </Link>

            <h2 className="mt-6 text-center text-lg font-semibold text-gray-900">
              Peregrine is a cloud-based aggregation and automation platform
              designed to integrate with your architecture
            </h2>
          </div>
          <Main />
        </div>
      </div>
      <Footer />
    </>
  );
}