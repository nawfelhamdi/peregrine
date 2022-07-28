import React from 'react';

import Header from './components/Header';
import Features from './components/Features';
import Footer from '../../shareds/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Features />
      <Footer />
    </div>
  );
}
