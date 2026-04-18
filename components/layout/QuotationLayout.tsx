'use client';

import React, { useState, useEffect } from 'react';
import QuotationForm from '../form/QuotationForm';
import LivePreview from '../preview/LivePreview';
import { Eye, Edit3 } from 'lucide-react';

export default function QuotationLayout() {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen lg:h-screen bg-[#f3f4f6] text-gray-900 overflow-hidden flex flex-col py-0 lg:py-4 xl:py-6">
      {/* Container */}
      <div className="w-full lg:max-w-[98%] xl:max-w-[95%] 2xl:max-w-[92%] mx-auto h-full flex flex-col lg:flex-row bg-white lg:rounded-2xl lg:shadow-2xl overflow-hidden border border-gray-200">

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden flex border-b bg-white shrink-0">
          <button
            className={`flex-1 py-3.5 flex items-center justify-center gap-2 font-medium text-sm ${
              activeTab === 'form'
                ? 'text-[#019689] border-b-2 border-[#019689]'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('form')}
          >
            <Edit3 className="w-4 h-4" /> Edit
          </button>
          <button
            className={`flex-1 py-3.5 flex items-center justify-center gap-2 font-medium text-sm ${
              activeTab === 'preview'
                ? 'text-[#019689] border-b-2 border-[#019689]'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
        </div>

        {/* Form Panel */}
        <div
          className={`w-full lg:w-[42%] xl:w-[40%] flex-col bg-gray-50/30 border-r border-gray-200 h-full overflow-y-auto ${
            activeTab === 'form' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="bg-[#019689] text-white p-1.5 sm:p-2 rounded-lg">
                <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              Quotation Setup
            </h1>
            <QuotationForm />
          </div>
        </div>

        {/* Preview Panel */}
        <div
          className={`w-full lg:w-[58%] xl:w-[60%] flex-col h-full bg-gray-100 overflow-hidden relative ${
            activeTab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <LivePreview />
        </div>
      </div>
    </div>
  );
}
