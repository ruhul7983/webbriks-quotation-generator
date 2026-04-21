'use client';

import React from 'react';
import { useQuotationStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import ServiceManager from './ServiceManager';
import {
  FileText,
  User,
  Building2,
  Layers,
  Settings,
  StickyNote,
} from 'lucide-react';

function FormSection({
  id,
  title,
  icon,
  badge,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={`section-${id}`} className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <span className="text-[#019689]">{icon}</span>
          <h2 className="font-semibold text-gray-900 text-base">{title}</h2>
        </div>
        {badge && (
          <span className="text-xs bg-[#019689]/10 text-[#019689] font-semibold px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

export default function QuotationForm() {
  const { data, updateCompany, updateClient, updateDetails, updateSettings, setCustomNotes } =
    useQuotationStore();

  return (
    <div className="space-y-6">
      {/* ── Quotation Details ── */}
      <FormSection
        id="details"
        title="Quotation Details"
        icon={<FileText className="w-5 h-5" />}
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Quotation Title</Label>
            <Input
              value={data.details.title}
              onChange={(e) => updateDetails({ title: e.target.value })}
              placeholder="e.g. Web Design & Development Service"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Number</Label>
              <Input
                value={data.details.quotationNumber}
                onChange={(e) =>
                  updateDetails({ quotationNumber: e.target.value })
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Date</Label>
              <Input
                type="date"
                value={data.details.date}
                onChange={(e) => updateDetails({ date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Valid Until</Label>
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
        icon={<User className="w-5 h-5" />}
        badge={data.client.companyName || undefined}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Client Name</Label>
            <Input
              value={data.client.contactName}
              onChange={(e) => updateClient({ contactName: e.target.value })}
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Company</Label>
            <Input
              value={data.client.companyName}
              onChange={(e) => updateClient({ companyName: e.target.value })}
              placeholder="Acme Corp"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-sm">Address</Label>
            <Textarea
              value={data.client.address}
              onChange={(e) => updateClient({ address: e.target.value })}
              placeholder="Client address"
              rows={2}
              className="resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Email</Label>
            <Input
              type="email"
              value={data.client.email}
              onChange={(e) => updateClient({ email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Phone</Label>
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
        title="Your Company Details"
        icon={<Building2 className="w-5 h-5" />}
        badge={data.company.name || undefined}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Company Name</Label>
            <Input
              value={data.company.name}
              onChange={(e) => updateCompany({ name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Website</Label>
            <Input
              value={data.company.website}
              onChange={(e) => updateCompany({ website: e.target.value })}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label className="text-sm">Address</Label>
            <Textarea
              value={data.company.address}
              onChange={(e) => updateCompany({ address: e.target.value })}
              rows={2}
              className="resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Email</Label>
            <Input
              type="email"
              value={data.company.email}
              onChange={(e) => updateCompany({ email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Phone</Label>
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
        icon={<Layers className="w-5 h-5" />}
        badge={`${data.services.length} service${data.services.length !== 1 ? 's' : ''}`}
      >
        <ServiceManager />
      </FormSection>

      {/* ── Settings ── */}
      <FormSection
        id="settings"
        title="Pricing Settings"
        icon={<Settings className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Currency</Label>
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
            <Label className="text-sm">Tax Rate (%)</Label>
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
            <Label className="text-sm">Discount (Amount)</Label>
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

      {/* ── Terms & Notes ── */}
      <FormSection
        id="notes"
        title="Terms & Notes"
        icon={<StickyNote className="w-5 h-5" />}
      >
        <div className="space-y-2">
          <Label className="text-sm">
            Terms, conditions, or additional notes (shown on quotation)
          </Label>
          <Textarea
            value={data.customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            rows={5}
            className="resize-none"
            placeholder="Enter terms and conditions..."
          />
          <p className="text-xs text-gray-500">
            Use bullet points (•) for a clean list format in the PDF.
          </p>
        </div>
      </FormSection>
    </div>
  );
}

