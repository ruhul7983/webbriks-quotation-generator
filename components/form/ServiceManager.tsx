'use client';

import React, { useState } from 'react';
import { useQuotationStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TagInput } from '@/components/ui/tag-input';
import {
  ChevronDown,
  Plus,
  Trash2,
  Package,
  Edit3,
  Check,
  GripVertical,
  Layers,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function ServiceManager() {
  const {
    data,
    addService,
    updateService,
    removeService,
    selectService,
    addPackage,
    updatePackage,
    removePackage,
    selectPackage,
  } = useQuotationStore();

  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    data.selectedServiceId
  );
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  const togglePackage = (id: string) => {
    setExpandedPackageId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {data.services.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Layers className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No services yet. Add one to get started.</p>
        </div>
      )}

      {data.services.map((service) => {
        const isSelectedService = data.selectedServiceId === service.id;
        const isExpanded = expandedServiceId === service.id;

        return (
          <div
            key={service.id}
            className={`border rounded-xl overflow-hidden transition-all duration-200 ${
              isSelectedService
                ? 'border-[#019689] shadow-md shadow-[#019689]/10'
                : 'border-gray-200'
            }`}
          >
            {/* Service Header */}
            <div
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                isSelectedService
                  ? 'bg-[#019689]/5'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  selectService(service.id);
                  if (!isExpanded) setExpandedServiceId(service.id);
                }}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelectedService
                    ? 'border-[#019689] bg-[#019689]'
                    : 'border-gray-300 hover:border-[#019689]'
                }`}
              >
                {isSelectedService && <Check className="w-3 h-3 text-white" />}
              </button>

              <div
                className="flex-1 min-w-0"
                onClick={() => toggleService(service.id)}
              >
                <h4 className="font-semibold text-gray-900 text-sm truncate">
                  {service.name || 'Unnamed Service'}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {service.packages.length} package{service.packages.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {data.services.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeService(service.id);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
                <button
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className="p-1"
                >
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Service Body */}
            {isExpanded && (
              <div className="px-4 pb-4 pt-3 space-y-4 border-t border-gray-100 bg-white">
                {/* Service Name & Description */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Service Name</Label>
                    <Input
                      value={service.name}
                      onChange={(e) =>
                        updateService(service.id, { name: e.target.value })
                      }
                      placeholder="e.g. Frontend Development"
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={service.description}
                      onChange={(e) =>
                        updateService(service.id, { description: e.target.value })
                      }
                      placeholder="Brief description of this service"
                      rows={2}
                      className="text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Packages */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Packages
                    </h5>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs border-dashed border-[#019689] text-[#019689] hover:bg-[#019689]/5"
                      onClick={() => addPackage(service.id)}
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Package
                    </Button>
                  </div>

                  {service.packages.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-4">
                      No packages. Add one above.
                    </p>
                  )}

                  {service.packages.map((pkg) => {
                    const isSelectedPkg = data.selectedPackageId === pkg.id;
                    const isPkgExpanded = expandedPackageId === pkg.id;

                    return (
                      <div
                        key={pkg.id}
                        className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                          isSelectedPkg
                            ? 'border-[#019689] bg-[#019689]/[0.02] ring-1 ring-[#019689]/20'
                            : 'border-gray-200'
                        }`}
                      >
                        {/* Package Header */}
                        <div
                          className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors ${
                            isSelectedPkg
                              ? 'bg-[#019689]/5'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <GripVertical className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 hidden sm:block" />

                          <button
                            type="button"
                            onClick={() => selectPackage(pkg.id)}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              isSelectedPkg
                                ? 'border-[#019689] bg-[#019689]'
                                : 'border-gray-300 hover:border-[#019689]'
                            }`}
                          >
                            {isSelectedPkg && (
                              <Check className="w-2.5 h-2.5 text-white" />
                            )}
                          </button>

                          <div
                            className="flex-1 min-w-0"
                            onClick={() => togglePackage(pkg.id)}
                          >
                            <div className="flex items-center gap-2">
                              <Package className="w-3.5 h-3.5 text-[#019689] flex-shrink-0" />
                              <span className="font-medium text-sm text-gray-900 truncate">
                                {pkg.name || 'Unnamed Package'}
                              </span>
                            </div>
                          </div>

                          <span className="text-sm font-bold text-[#019689] flex-shrink-0">
                            {formatCurrency(pkg.price, data.settings.currency)}
                          </span>

                          <div className="flex items-center gap-0.5 flex-shrink-0">
                            {service.packages.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-red-400 hover:text-red-600 hover:bg-red-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removePackage(service.id, pkg.id);
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                            <button
                              type="button"
                              onClick={() => togglePackage(pkg.id)}
                              className="p-0.5"
                            >
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                                  isPkgExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Package Body */}
                        {isPkgExpanded && (
                          <div className="px-3 pb-4 pt-3 space-y-3 border-t border-gray-100 bg-white">
                            {/* Name & Tagline */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs">Package Name</Label>
                                <Input
                                  value={pkg.name}
                                  onChange={(e) =>
                                    updatePackage(service.id, pkg.id, {
                                      name: e.target.value,
                                    })
                                  }
                                  placeholder="e.g. Starter Package"
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">Tagline</Label>
                                <Input
                                  value={pkg.tagline}
                                  onChange={(e) =>
                                    updatePackage(service.id, pkg.id, {
                                      tagline: e.target.value,
                                    })
                                  }
                                  placeholder="Short description"
                                  className="h-8 text-sm"
                                />
                              </div>
                            </div>

                            {/* Features */}
                            <TagInput
                              label="Features / Deliverables"
                              tags={pkg.features}
                              onChange={(features) =>
                                updatePackage(service.id, pkg.id, { features })
                              }
                              placeholder="e.g. Responsive Design"
                            />

                            {/* Tech Stacks */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <TagInput
                                label="Frontend Technologies"
                                tags={pkg.frontendTech}
                                onChange={(frontendTech) =>
                                  updatePackage(service.id, pkg.id, {
                                    frontendTech,
                                  })
                                }
                                placeholder="e.g. React"
                              />
                              <TagInput
                                label="Backend Technologies"
                                tags={pkg.backendTech}
                                onChange={(backendTech) =>
                                  updatePackage(service.id, pkg.id, {
                                    backendTech,
                                  })
                                }
                                placeholder="e.g. Node.js"
                              />
                            </div>

                            <TagInput
                              label="Design Tools"
                              tags={pkg.designTools}
                              onChange={(designTools) =>
                                updatePackage(service.id, pkg.id, { designTools })
                              }
                              placeholder="e.g. Figma"
                            />

                            {/* Numeric Fields */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs">Pages / Screens</Label>
                                <Input
                                  value={pkg.pages}
                                  onChange={(e) =>
                                    updatePackage(service.id, pkg.id, {
                                      pages: e.target.value,
                                    })
                                  }
                                  placeholder="e.g. 5-10"
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">Revisions</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  value={pkg.revisions}
                                  onChange={(e) =>
                                    updatePackage(service.id, pkg.id, {
                                      revisions: Number(e.target.value),
                                    })
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">
                                  Delivery (days)
                                </Label>
                                <Input
                                  type="number"
                                  min="1"
                                  value={pkg.deliveryDays}
                                  onChange={(e) =>
                                    updatePackage(service.id, pkg.id, {
                                      deliveryDays: Number(e.target.value),
                                    })
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs">
                                  Support (days)
                                </Label>
                                <Input
                                  type="number"
                                  min="0"
                                  value={pkg.supportDays}
                                  onChange={(e) =>
                                    updatePackage(service.id, pkg.id, {
                                      supportDays: Number(e.target.value),
                                    })
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                                <Label className="text-xs">
                                  Price ({data.settings.currency})
                                </Label>
                                <Input
                                  type="number"
                                  min="0"
                                  value={pkg.price}
                                  onChange={(e) =>
                                    updatePackage(service.id, pkg.id, {
                                      price: Number(e.target.value),
                                    })
                                  }
                                  className="h-8 text-sm font-semibold"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Service */}
      <Button
        variant="outline"
        className="w-full border-dashed border-2 border-gray-300 text-gray-500 hover:border-[#019689] hover:text-[#019689] hover:bg-[#019689]/5 py-5 transition-all"
        onClick={addService}
      >
        <Plus className="w-4 h-4 mr-2" /> Add New Service
      </Button>
    </div>
  );
}
