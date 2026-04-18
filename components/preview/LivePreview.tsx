'use client';

import React, { useMemo, lazy, Suspense } from 'react';
import { useQuotationStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PDFDownloadBtn = lazy(() => import('@/components/pdf/PDFDownloadBtn'));

export default function LivePreview() {
  const { data } = useQuotationStore();

  // Compute selected service & package
  const selectedService = useMemo(
    () => data.services.find((s) => s.id === data.selectedServiceId),
    [data.services, data.selectedServiceId]
  );
  const selectedPackage = useMemo(
    () => selectedService?.packages.find((p) => p.id === data.selectedPackageId),
    [selectedService, data.selectedPackageId]
  );

  // Pricing
  const packagePrice = selectedPackage?.price || 0;
  const taxAmount = packagePrice * (data.settings.taxRate / 100);
  const grandTotal = packagePrice + taxAmount - data.settings.discount;

  const hasNoSelection = !selectedService || !selectedPackage;

  return (
    <div className="flex flex-col h-full bg-gray-500 overflow-hidden">
      {/* Top Actions */}
      <div className="bg-white px-4 sm:px-6 py-3 border-b border-gray-200 shadow-sm flex justify-between items-center z-10 shrink-0">
        <div className="text-sm font-medium text-gray-600">PDF Live Preview</div>
        <div className="flex gap-2 sm:gap-3">
          <Button variant="outline" size="sm" onClick={() => window.print()} className="hidden sm:flex">
            <Printer className="w-4 h-4 mr-1.5" /> Print
          </Button>
          {!hasNoSelection && (
            <Suspense
              fallback={
                <Button className="bg-[#019689] hover:bg-[#019689]/90" size="sm" disabled>
                  Loading...
                </Button>
              }
            >
              <PDFDownloadBtn
                data={data}
                service={selectedService}
                pkg={selectedPackage}
                totalAmounts={{
                  packagePrice,
                  taxAmount,
                  grandTotal,
                }}
              />
            </Suspense>
          )}
        </div>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 flex justify-center pb-20">
        <div
          className="bg-white w-full max-w-[210mm] min-h-[297mm] shadow-2xl rounded-sm text-gray-800 flex flex-col relative print:shadow-none print:w-full print:max-w-none print:min-h-0"
        >
          {hasNoSelection ? (
            <div className="flex items-center justify-center flex-1 text-gray-400 text-sm p-8">
              <div className="text-center">
                <p className="font-medium">No service & package selected</p>
                <p className="text-xs mt-1">Select a service and package from the form to preview the quotation.</p>
              </div>
            </div>
          ) : (
            <>
              {/* ═══════ PAGE 1 ═══════ */}

              {/* Header */}
              <div className="px-6 sm:px-8 pt-6 pb-4 border-b-2 border-[#019689] flex justify-between items-start">
                <div className="space-y-0.5 max-w-[50%]">
                  {data.company.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={data.company.logo}
                      alt="Company Logo"
                      className="h-10 object-contain object-left mb-2"
                    />
                  ) : (
                    <h1 className="text-2xl font-black text-[#019689] mb-2">
                      {data.company.name}
                    </h1>
                  )}
                  <p className="text-xs text-gray-500 leading-snug">{data.company.address}</p>
                  <p className="text-xs text-gray-500">
                    {data.company.email} | {data.company.phone}
                  </p>
                  <p className="text-xs text-[#019689]">{data.company.website}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-light text-gray-300 uppercase tracking-widest mb-2">
                    Quotation
                  </h2>
                  <div className="text-xs space-y-0.5">
                    <div className="flex justify-end gap-2">
                      <span className="text-gray-500 font-semibold">ID:</span>
                      <span className="font-medium text-gray-900 w-28 text-left">
                        {data.details.quotationNumber}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <span className="text-gray-500 font-semibold">Date:</span>
                      <span className="font-medium text-gray-900 w-28 text-left">
                        {data.details.date
                          ? format(new Date(data.details.date), 'MMM dd, yyyy')
                          : '-'}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <span className="text-gray-500 font-semibold">Valid Until:</span>
                      <span className="font-medium text-gray-900 w-28 text-left">
                        {data.details.validUntil
                          ? format(new Date(data.details.validUntil), 'MMM dd, yyyy')
                          : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-5 flex-1">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-3">{data.details.title}</h3>

                {/* Client Info */}
                <div className="bg-[#019689]/5 p-4 rounded-lg border border-[#019689]/20 mb-5 flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-1">
                    <p className="text-[10px] text-[#019689] font-bold uppercase tracking-widest mb-1">
                      Quotation For:
                    </p>
                    <h4 className="text-sm font-bold text-gray-900">
                      {data.client.contactName}
                    </h4>
                    <p className="text-xs font-medium text-gray-700">
                      {data.client.companyName}
                    </p>
                  </div>
                  <div className="flex-1 text-xs text-gray-500 space-y-0.5">
                    <p>{data.client.address}</p>
                    <p>{data.client.email}</p>
                    <p>{data.client.phone}</p>
                  </div>
                </div>

                {/* Service & Package Badge */}
                <div className="bg-gradient-to-r from-[#019689] to-[#017d73] rounded-lg p-4 sm:p-5 mb-5 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">
                    Service
                  </p>
                  <h4 className="text-base sm:text-lg font-bold mb-0.5">{selectedService.name}</h4>
                  <p className="text-xs text-white/80 mb-2">{selectedService.description}</p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-white/15 rounded-md px-3 py-2">
                    <div className="flex-1">
                      <p className="text-sm font-bold">{selectedPackage.name}</p>
                      {selectedPackage.tagline && (
                        <p className="text-xs text-white/70">{selectedPackage.tagline}</p>
                      )}
                    </div>
                    <p className="text-xl font-black">
                      {formatCurrency(selectedPackage.price, data.settings.currency)}
                    </p>
                  </div>
                </div>

                {/* Features / Deliverables */}
                {selectedPackage.features.length > 0 && (
                  <div className="mb-5">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                      What&apos;s Included
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {selectedPackage.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-[#019689] mt-0.5 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Scope */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {selectedPackage.pages && (
                    <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                      <p className="text-lg font-bold text-[#019689]">{selectedPackage.pages}</p>
                      <p className="text-[10px] text-gray-500 font-medium uppercase">Pages</p>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                    <p className="text-lg font-bold text-[#019689]">{selectedPackage.revisions}</p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">Revisions</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                    <p className="text-lg font-bold text-[#019689]">
                      {selectedPackage.deliveryDays}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">
                      Delivery Days
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                    <p className="text-lg font-bold text-[#019689]">
                      {selectedPackage.supportDays}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">
                      Support Days
                    </p>
                  </div>
                </div>

                {/* ─── Visual Page Break ─── */}
                <div className="border-t-2 border-dashed border-gray-200 my-6 relative">
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-3 text-[9px] text-gray-400 font-medium uppercase tracking-wider">
                    Page Break
                  </span>
                </div>

                {/* ═══════ PAGE 2 CONTENT ═══════ */}

                {/* Technology Stack */}
                {(selectedPackage.frontendTech.length > 0 ||
                  selectedPackage.backendTech.length > 0 ||
                  selectedPackage.designTools.length > 0) && (
                  <div className="mb-5">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                      Technology Stack
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedPackage.frontendTech.length > 0 && (
                        <div>
                          <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">
                            Frontend
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPackage.frontendTech.map((tech, i) => (
                              <span
                                key={i}
                                className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-md border border-blue-100"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedPackage.backendTech.length > 0 && (
                        <div>
                          <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">
                            Backend
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPackage.backendTech.map((tech, i) => (
                              <span
                                key={i}
                                className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-md border border-green-100"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedPackage.designTools.length > 0 && (
                        <div>
                          <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">
                            Design Tools
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPackage.designTools.map((tool, i) => (
                              <span
                                key={i}
                                className="bg-purple-50 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-md border border-purple-100"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Delivery Timeline */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-5">
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Delivery Timeline
                  </h5>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        Estimated delivery within{' '}
                        <span className="font-bold text-[#019689]">
                          {selectedPackage.deliveryDays} business days
                        </span>{' '}
                        from project kickoff.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Post-delivery support:{' '}
                        <span className="font-semibold">{selectedPackage.supportDays} days</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="mb-5">
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Investment Summary
                  </h5>
                  <div className="flex justify-end">
                    <div className="w-full max-w-[260px] bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs">
                      <div className="flex justify-between py-1.5">
                        <span className="text-gray-600 font-medium">Package Price</span>
                        <span className="font-semibold">
                          {formatCurrency(packagePrice, data.settings.currency)}
                        </span>
                      </div>
                      {data.settings.taxRate > 0 && (
                        <div className="flex justify-between py-1.5">
                          <span className="text-gray-600 font-medium">
                            Tax ({data.settings.taxRate}%)
                          </span>
                          <span className="font-semibold text-gray-700">
                            +{formatCurrency(taxAmount, data.settings.currency)}
                          </span>
                        </div>
                      )}
                      {data.settings.discount > 0 && (
                        <div className="flex justify-between py-1.5 text-green-600">
                          <span className="font-medium">Discount</span>
                          <span className="font-semibold">
                            -{formatCurrency(data.settings.discount, data.settings.currency)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 mt-1 border-t border-gray-300 text-base font-bold text-[#019689]">
                        <span>Grand Total</span>
                        <span>{formatCurrency(grandTotal, data.settings.currency)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                {data.customNotes && (
                  <div className="mb-5">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Terms & Conditions
                    </h5>
                    <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                      {data.customNotes}
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-400 italic mt-4 border-t pt-3">
                  This quotation is valid until{' '}
                  {data.details.validUntil
                    ? format(new Date(data.details.validUntil), 'MMMM dd, yyyy')
                    : '-'}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-auto px-6 sm:px-8 pb-6 pt-0">
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-gray-800 text-sm">Md. Ashaduzzaman</p>
                  <p className="text-xs text-gray-500">Founder and CEO</p>
                  <p className="text-xs text-[#019689] font-medium">WebBriks</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
