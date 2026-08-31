import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import AiAssistantWidget from '../components/ai/AiAssistantWidget';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cream-100 font-sans text-charcoal-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AiAssistantWidget />
    </div>
  );
};

export default PublicLayout;
