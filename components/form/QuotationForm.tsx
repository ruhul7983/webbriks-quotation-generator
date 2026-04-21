'use client';

import React from 'react';
import { useQuotationStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  FileText,
  User,
  Building2,
  Settings,
  StickyNote,
  List,
  Cpu,
  Monitor,
  LayoutDashboard,
  Rocket,
  Clock,
  Briefcase,
  Plus,
  Trash2,
  Sparkles
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
          <span className="text-gray-700">{icon}</span>
          <h2 className="font-semibold text-gray-900 text-base">{title}</h2>
        </div>
        {badge && (
          <span className="text-xs bg-gray-200 text-gray-700 font-semibold px-2.5 py-1 rounded-full">
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
  const { 
    data, updateCompany, updateClient, updateDetails, loadTemplate, updateSettings,
    updateOverview, updateTechStack, updateFeatures, updateAdminFeatures,
    updateMarketingSetup, updateDeliveryTimeline, updateWorkflow, updateFinalNote,
    updatePricing, addScopePhase, updateScopePhase, removeScopePhase,
    addOptionalService, updateOptionalService, removeOptionalService
  } = useQuotationStore();

  const handleListChange = (val: string, updater: (arr: string[]) => void) => {
    updater(val.split('\n'));
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-900 text-white p-5 rounded-xl shadow-md">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2"><Sparkles className="w-5 h-5 text-yellow-400" /> Start with a Template</h3>
          <p className="text-sm text-gray-400">Instantly fill the proposal with boilerplate content.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2 relative group">
          <select 
            defaultValue=""
            onChange={(e) => {
              if (e.target.value) {
                loadTemplate(e.target.value as any);
                e.target.selectedIndex = 0; // Reset
              }
            }}
            className="px-4 py-2 rounded-md bg-white text-gray-900 font-semibold cursor-pointer outline-none hover:bg-gray-100 transition-colors"
          >
            <option value="" disabled>Choose a template...</option>
            <option value="ecommerce">E-Commerce Website</option>
            <option value="saas">SaaS Development</option>
            <option value="service">Service / Agency Website</option>
          </select>
        </div>
      </div>

      {/* ── Quotation Details ── */}
      <FormSection id="details" title="Document Details" icon={<FileText className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Proposal Title</Label>
            <Input value={data.details.title} onChange={(e) => updateDetails({ title: e.target.value })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Quotation Number</Label>
              <Input value={data.details.quotationNumber} onChange={(e) => updateDetails({ quotationNumber: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Date</Label>
              <Input type="date" value={data.details.date} onChange={(e) => updateDetails({ date: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Valid Until</Label>
              <Input type="date" value={data.details.validUntil} onChange={(e) => updateDetails({ validUntil: e.target.value })} />
            </div>
          </div>
        </div>
      </FormSection>

      {/* ── Client & Company Information ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormSection id="client" title="Client Info" icon={<User className="w-5 h-5" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Contact Name</Label>
                <Input value={data.client.contactName} onChange={(e) => updateClient({ contactName: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Company</Label>
                <Input value={data.client.companyName} onChange={(e) => updateClient({ companyName: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Address</Label>
              <Textarea value={data.client.address} onChange={(e) => updateClient({ address: e.target.value })} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Email</Label>
                <Input type="email" value={data.client.email} onChange={(e) => updateClient({ email: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Phone</Label>
                <Input value={data.client.phone} onChange={(e) => updateClient({ phone: e.target.value })} />
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection id="company" title="Your Company" icon={<Building2 className="w-5 h-5" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Company Name</Label>
                <Input value={data.company.name} onChange={(e) => updateCompany({ name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Website</Label>
                <Input value={data.company.website} onChange={(e) => updateCompany({ website: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Address</Label>
              <Textarea value={data.company.address} onChange={(e) => updateCompany({ address: e.target.value })} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Email</Label>
                <Input type="email" value={data.company.email} onChange={(e) => updateCompany({ email: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Phone</Label>
                <Input value={data.company.phone} onChange={(e) => updateCompany({ phone: e.target.value })} />
              </div>
            </div>
          </div>
        </FormSection>
      </div>

      {/* ── Project Overview ── */}
      <FormSection id="overview" title="Project Overview" icon={<Monitor className="w-5 h-5" />}>
        <Textarea 
          value={data.overview} 
          onChange={(e) => updateOverview(e.target.value)} 
          rows={4}
          placeholder="Describe the overall goal of this project..."
        />
      </FormSection>

      {/* ── Scope of Work ── */}
      <FormSection id="scope" title="Scope of Work (Phases)" icon={<Briefcase className="w-5 h-5" />}>
        <div className="space-y-4">
          {data.scopeOfWork.map((phase, idx) => (
            <div key={phase.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
              <button 
                onClick={() => removeScopePhase(phase.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              ><Trash2 className="w-4 h-4" /></button>
              <div className="space-y-3">
                <div className="space-y-1.5 w-full pr-8">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phase {idx + 1} Title</Label>
                  <Input value={phase.title} onChange={e => updateScopePhase(phase.id, { title: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description</Label>
                  <Textarea value={phase.description} onChange={e => updateScopePhase(phase.id, { description: e.target.value })} rows={2} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">List Items (One per line)</Label>
                  <Textarea value={phase.items.join('\n')} onChange={e => updateScopePhase(phase.id, { items: e.target.value.split('\n') })} rows={3} />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addScopePhase} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2"/> Add Phase</Button>
        </div>
      </FormSection>

      {/* ── Tech Stack ── */}
      <FormSection id="tech" title="Technology Stack" icon={<Cpu className="w-5 h-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Frontend (Comma separated)</Label>
            <Input value={data.techStack.frontend.join(', ')} onChange={e => updateTechStack({ frontend: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })} placeholder="Next.js, Tailwind..." />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Backend (Comma separated)</Label>
            <Input value={data.techStack.backend.join(', ')} onChange={e => updateTechStack({ backend: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })} placeholder="Node.js, PostgreSQL..." />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">Tools (Comma separated)</Label>
            <Input value={data.techStack.tools.join(', ')} onChange={e => updateTechStack({ tools: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })} placeholder="Figma, GitHub..." />
          </div>
        </div>
      </FormSection>

      {/* ── Features List ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormSection id="features" title="Platform Features" icon={<List className="w-5 h-5" />}>
          <Label className="text-xs mb-2 block text-gray-500">One feature per line</Label>
          <Textarea value={data.features.join('\n')} onChange={e => handleListChange(e.target.value, updateFeatures)} rows={6} />
        </FormSection>
        <FormSection id="admin" title="Admin Dashboard" icon={<LayoutDashboard className="w-5 h-5" />}>
          <Label className="text-xs mb-2 block text-gray-500">One feature per line</Label>
          <Textarea value={data.adminFeatures.join('\n')} onChange={e => handleListChange(e.target.value, updateAdminFeatures)} rows={6} />
        </FormSection>
      </div>

      {/* ── Marketing & Delivery ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormSection id="marketing" title="Marketing Setup" icon={<Rocket className="w-5 h-5" />}>
          <Label className="text-xs mb-2 block text-gray-500">One item per line</Label>
          <Textarea value={data.marketingSetup.join('\n')} onChange={e => handleListChange(e.target.value, updateMarketingSetup)} rows={3} />
        </FormSection>
        <FormSection id="delivery" title="Delivery Timeline" icon={<Clock className="w-5 h-5" />}>
          <Label className="text-xs mb-2 block text-gray-500">Timeline Description</Label>
          <Textarea value={data.deliveryTimeline} onChange={e => updateDeliveryTimeline(e.target.value)} rows={3} />
        </FormSection>
      </div>

      {/* ── Pricing Base ── */}
      <FormSection id="pricing" title="Website Pricing" icon={<Settings className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-900 font-bold">Total Base Cost</Label>
              <Input type="number" value={data.pricing.totalCost} onChange={e => updatePricing({ totalCost: Number(e.target.value) })} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-900 font-bold">Document Currency</Label>
              <select 
                value={data.settings.currency}
                onChange={e => updateSettings({ currency: e.target.value as any })}
                className="flex h-10 w-full rounded-md border border-teal-200 bg-teal-50/40 px-3 py-2 text-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#019689] focus-visible:bg-white transition-colors cursor-pointer"
              >
                <option value="৳">Bangladeshi Taka (৳)</option>
                <option value="$">US Dollar ($)</option>
                <option value="€">Euro (€)</option>
                <option value="£">British Pound (£)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">What's Included (One per line)</Label>
              <Textarea value={data.pricing.included.join('\n')} onChange={e => handleListChange(e.target.value, (arr) => updatePricing({ included: arr }))} rows={4} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">What's NOT Included (One per line)</Label>
              <Textarea value={data.pricing.notIncluded.join('\n')} onChange={e => handleListChange(e.target.value, (arr) => updatePricing({ notIncluded: arr }))} rows={4} />
            </div>
          </div>
        </div>
      </FormSection>

      {/* ── Optional Add-ons ── */}
      <FormSection id="optional" title="Optional Services / Hosting" icon={<Plus className="w-5 h-5" />}>
        <div className="space-y-4">
          {data.optionalServices.map((srv) => (
            <div key={srv.id} className="p-4 border border-gray-200 rounded-lg relative bg-white shadow-sm">
              <button 
                onClick={() => removeOptionalService(srv.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              ><Trash2 className="w-4 h-4" /></button>
              
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-6 pr-8 space-y-1.5">
                  <Label className="text-xs">Service Title</Label>
                  <Input value={srv.title} onChange={e => updateOptionalService(srv.id, { title: e.target.value })} />
                </div>
                <div className="col-span-6 sm:col-span-3 space-y-1.5">
                  <Label className="text-xs">Price</Label>
                  <Input type="number" value={srv.price} onChange={e => updateOptionalService(srv.id, { price: Number(e.target.value) })} />
                </div>
                <div className="col-span-6 sm:col-span-3 space-y-1.5">
                  <Label className="text-xs">Recurrence</Label>
                  <Select value={srv.type} onChange={e => updateOptionalService(srv.id, { type: e.target.value as any })}>
                    <option value="one-time">One Time</option>
                    <option value="recurring">Recurring (Yearly)</option>
                  </Select>
                </div>
                <div className="col-span-12 space-y-1.5">
                  <Label className="text-xs">Description</Label>
                  <Textarea value={srv.description} onChange={e => updateOptionalService(srv.id, { description: e.target.value })} rows={1}/>
                </div>
                <div className="col-span-12 space-y-1.5">
                  <Label className="text-xs">Features List (One per line, optional)</Label>
                  <Textarea value={srv.items.join('\n')} onChange={e => updateOptionalService(srv.id, { items: e.target.value.split('\n') })} rows={2}/>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addOptionalService} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2"/> Add Optional Service</Button>
        </div>
      </FormSection>

      {/* ── Workflow & Notes ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormSection id="workflow" title="Workflow Summary" icon={<List className="w-5 h-5" />}>
           <Label className="text-xs mb-2 block text-gray-500">Ordered Steps (One per line)</Label>
           <Textarea value={data.workflow.join('\n')} onChange={e => handleListChange(e.target.value, updateWorkflow)} rows={5} />
        </FormSection>
        <FormSection id="notes" title="Final Note" icon={<StickyNote className="w-5 h-5" />}>
          <Textarea 
            value={data.finalNote} 
            onChange={(e) => updateFinalNote(e.target.value)} 
            rows={6}
          />
        </FormSection>
      </div>

    </div>
  );
}
