'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import QuotationForm from '../form/QuotationForm';
import { useQuotationStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

const PDFDownloadBtn = lazy(() => import('@/components/pdf/PDFDownloadBtn'));

export default function QuotationLayout() {
  const [mounted, setMounted] = useState(false);
  const { data } = useQuotationStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const baseTotal = data.pricing?.totalCost || 0;
  const taxAmount = baseTotal * (data.settings.taxRate / 100);
  const grandTotal = baseTotal + taxAmount - data.settings.discount;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 pb-28">
      {/* Container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col pt-6 lg:pt-10 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Proposal Generator
        </h1>
        <QuotationForm />
      </div>

      {/* Sticky Bottom Bar for PDF Download */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
            <span className="text-sm text-gray-500 font-medium">Grand Total</span>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              {formatCurrency(grandTotal, data.settings.currency)}
            </span>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
            <Suspense
              fallback={
                <div className="px-6 py-2.5 bg-gray-200 text-gray-500 rounded-md animate-pulse">
                  Loading PDF...
                </div>
              }
            >
              <PDFDownloadBtn
                data={data}
                totalAmounts={{ packagePrice: baseTotal, taxAmount, grandTotal }}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
