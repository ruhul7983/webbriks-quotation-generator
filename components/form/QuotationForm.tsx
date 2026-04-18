'use client';

import React, { useState } from 'react';
import { useQuotationStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import ServiceManager from './ServiceManager';
import {
  ChevronDown,
  FileText,
  User,
  Building2,
  Layers,
  Settings,
  StickyNote,
} from 'lucide-react';

type SectionKey = 'details' | 'client' | 'company' | 'services' | 'notes' | 'settings';

function FormSection({
  id,
  title,
  icon,
  isOpen,
  onToggle,
  badge,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/80 transition-colors"
        id={`section-${id}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-[#019689]">{icon}</span>
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
          {badge && (
            <span className="text-[10px] bg-[#019689]/10 text-[#019689] font-semibold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4.5 h-4.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

export default function QuotationForm() {
  const { data, updateCompany, updateClient, updateDetails, updateSettings, setCustomNotes } =
    useQuotationStore();

  const [openSections, setOpenSections] = useState<Set<SectionKey>>(
    new Set(['details', 'services'])
  );

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-3 pb-20">
      {/* ── Quotation Details ── */}
      <FormSection
        id="details"
        title="Quotation Details"
        icon={<FileText className="w-4.5 h-4.5" />}
        isOpen={openSections.has('details')}
        onToggle={() => toggleSection('details')}
      >
        <div className="space-y-3 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Quotation Title</Label>
            <Input
              value={data.details.title}
              onChange={(e) => updateDetails({ title: e.target.value })}
              placeholder="e.g. Web Design & Development Service"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Number</Label>
              <Input
                value={data.details.quotationNumber}
                onChange={(e) =>
                  updateDetails({ quotationNumber: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                value={data.details.date}
                onChange={(e) => updateDetails({ date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Valid Until</Label>
              <Input
                type="date"
                value={data.details.validUntil}
                onChange={(e) => updateDetails({ validUntil: e.target.value })}
              />
            </div>
          </div>
        </div>
      </FormSection>

      {/* ── Client Information ── */}
      <FormSection
        id="client"
        title="Client Information"
        icon={<User className="w-4.5 h-4.5" />}
        isOpen={openSections.has('client')}
        onToggle={() => toggleSection('client')}
        badge={data.client.companyName || undefined}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Client Name</Label>
            <Input
              value={data.client.contactName}
              onChange={(e) => updateClient({ contactName: e.target.value })}
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Company</Label>
            <Input
              value={data.client.companyName}
              onChange={(e) => updateClient({ companyName: e.target.value })}
              placeholder="Acme Corp"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs">Address</Label>
            <Textarea
              value={data.client.address}
              onChange={(e) => updateClient({ address: e.target.value })}
              placeholder="Client address"
              rows={2}
              className="resize-none text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Email</Label>
            <Input
              type="email"
              value={data.client.email}
              onChange={(e) => updateClient({ email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Phone</Label>
            <Input
              value={data.client.phone}
              onChange={(e) => updateClient({ phone: e.target.value })}
            />
          </div>
        </div>
      </FormSection>

      {/* ── Company Details ── */}
      <FormSection
        id="company"
        title="Company Details"
        icon={<Building2 className="w-4.5 h-4.5" />}
        isOpen={openSections.has('company')}
        onToggle={() => toggleSection('company')}
        badge={data.company.name || undefined}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Company Name</Label>
            <Input
              value={data.company.name}
              onChange={(e) => updateCompany({ name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Website</Label>
            <Input
              value={data.company.website}
              onChange={(e) => updateCompany({ website: e.target.value })}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-xs">Address</Label>
            <Textarea
              value={data.company.address}
              onChange={(e) => updateCompany({ address: e.target.value })}
              rows={2}
              className="resize-none text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Email</Label>
            <Input
              type="email"
              value={data.company.email}
              onChange={(e) => updateCompany({ email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Phone</Label>
            <Input
              value={data.company.phone}
              onChange={(e) => updateCompany({ phone: e.target.value })}
            />
          </div>
        </div>
      </FormSection>

      {/* ── Services & Packages ── */}
      <FormSection
        id="services"
        title="Services & Packages"
        icon={<Layers className="w-4.5 h-4.5" />}
        isOpen={openSections.has('services')}
        onToggle={() => toggleSection('services')}
        badge={`${data.services.length} service${data.services.length !== 1 ? 's' : ''}`}
      >
        <div className="pt-2">
          <ServiceManager />
        </div>
      </FormSection>

      {/* ── Terms & Notes ── */}
      <FormSection
        id="notes"
        title="Terms & Notes"
        icon={<StickyNote className="w-4.5 h-4.5" />}
        isOpen={openSections.has('notes')}
        onToggle={() => toggleSection('notes')}
      >
        <div className="pt-2 space-y-1.5">
          <Label className="text-xs">
            Terms, conditions, or additional notes (shown on quotation)
          </Label>
          <Textarea
            value={data.customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            rows={5}
            className="resize-none text-sm"
            placeholder="Enter terms and conditions..."
          />
          <p className="text-[10px] text-gray-400">
            Use bullet points (•) for a clean list format in the PDF.
          </p>
        </div>
      </FormSection>

      {/* ── Settings ── */}
      <FormSection
        id="settings"
        title="Settings"
        icon={<Settings className="w-4.5 h-4.5" />}
        isOpen={openSections.has('settings')}
        onToggle={() => toggleSection('settings')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Currency</Label>
            <Select
              value={data.settings.currency}
              onChange={(e) =>
                updateSettings({
                  currency: e.target.value as '$' | '৳',
                })
              }
            >
              <option value="$">USD ($)</option>
              <option value="৳">BDT (৳)</option>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Tax Rate (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={data.settings.taxRate}
              onChange={(e) =>
                updateSettings({ taxRate: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Discount (Amount)</Label>
            <Input
              type="number"
              min="0"
              value={data.settings.discount}
              onChange={(e) =>
                updateSettings({ discount: Number(e.target.value) })
              }
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
}
