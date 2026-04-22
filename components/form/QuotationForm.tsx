'use client';

import React from 'react';
import { useQuotationStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Sparkles,
  Camera
} from 'lucide-react';

const PREDEFINED_WEB_PHASES = [
  {
    id: "phase-1",
    title: "UI/UX Design Phase",
    items: [
      "Full UI design shared for review.",
      "Feedback and revisions finalized in this phase.",
      "Upon approval, development begins."
    ]
  },
  {
    id: "phase-2",
    title: "Frontend Development Phase",
    items: [
      "Homepage with banners & featured sections",
      "Product listing with categories & filters",
      "Product details page",
      "Search functionality",
      "Shopping cart system",
      "Checkout process",
      "User login & registration",
      "Order tracking interface",
      "Offers & discount display",
      "Contact & support pages",
      "Newsletter subscription",
      "Mobile responsive design"
    ]
  },
  {
    id: "phase-3",
    title: "Admin Dashboard & Backend Phase",
    items: [
      "Admin dashboard overview",
      "User & role management",
      "Product & category management",
      "Inventory management",
      "Order management & status tracking",
      "Customer management",
      "Shopping cart monitoring",
      "Payment management",
      "Coupon & discount management",
      "Review & rating management",
      "Marketing tools & campaign management",
      "Analytics & sales reports",
      "Courier integration & parcel booking",
      "Shipment tracking from courier",
      "Fraud detection & order validation",
      "CMS & content management",
      "Contact & support management",
      "System settings & configuration"
    ]
  },
  {
    id: "phase-4",
    title: "Marketing & SEO Phase",
    items: [
      "Facebook Pixel integration",
      "Google Analytics (GA4) setup",
      "Conversion tracking ready structure",
      "Custom data layer implementation",
      "Google Tag Manager (GTM) integration",
      "Event tracking (add to cart, purchase, etc.)",
      "Ecommerce tracking setup",
      "Page speed & performance optimization",
      "Search engine indexing setup (Google Search Console)"
    ]
  }
];

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
    data, setServiceType, updateCompany, updateClient, updateDetails, loadTemplate, updateSettings,
    updateOverview, updateTechStack, updateFeatures, updateAdminFeatures,
    updateMarketingSetup, updateDeliveryTimeline, updateWorkflow, updateFinalNote,
    updatePricing, addScopePhase, updateScopePhase, removeScopePhase,
    addOptionalService, updateOptionalService, removeOptionalService,
    addPhotographyItem, updatePhotographyItem, removePhotographyItem
  } = useQuotationStore();

  const handleListChange = (val: string, updater: (arr: string[]) => void) => {
    updater(val.split('\n'));
  };

  return (
    <div className="space-y-6">

      {/* ── Top Level Mode Selector ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
        <div>
          <h3 className="font-bold text-lg text-gray-900">Select Service Type</h3>
          <p className="text-sm text-gray-500">Choose the format of your quotation.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={data.serviceType}
            onChange={(e) => setServiceType(e.target.value as any)}
            className="px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-gray-900 font-semibold cursor-pointer outline-none hover:bg-gray-100 transition-colors"
          >
            <option value="web-development">Web Design & Development</option>
            <option value="product-photography">Product Photography</option>
          </select>
        </div>
      </div>

      {data.serviceType === 'web-development' && (
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
      )}

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

      {/* ── Document Currency ── */}
      <div className="flex bg-white border border-gray-200 p-5 rounded-xl shadow-sm items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-900">Document Currency</h3>
          <p className="text-sm text-gray-500">Used for all pricing values.</p>
        </div>
        <select
          value={data.settings.currency}
          onChange={e => updateSettings({ currency: e.target.value as any })}
          className="h-10 rounded-md border border-teal-200 bg-teal-50/40 px-3 text-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#019689] focus-visible:bg-white transition-colors cursor-pointer"
        >
          <option value="৳">Bangladeshi Taka (৳)</option>
          <option value="$">US Dollar ($)</option>
          <option value="€">Euro (€)</option>
          <option value="£">British Pound (£)</option>
        </select>
      </div>

      {/* ── Pricing Base ── */}
      {data.serviceType === 'web-development' && ( // Changed '?' to '&&'
        <FormSection id="pricing" title="Website Pricing" icon={<Settings className="w-5 h-5" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-sm text-gray-900 font-bold">Total Base Cost (Fixed)</Label>
                <Input
                  type="number"
                  value={data.pricing.totalCost}
                  onChange={e => updatePricing({ totalCost: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </FormSection>
      )}

      {/* ── Payment Terms (Web Development only) ── */}
      {data.serviceType === 'web-development' && (
        <div className="border border-teal-200 rounded-xl bg-teal-50/40 overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-teal-100 flex items-center gap-3 bg-teal-50">
            <span className="text-teal-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
            </span>
            <h2 className="font-semibold text-teal-900 text-base">Payment Terms</h2>
            <span className="ml-auto text-xs bg-teal-200 text-teal-800 font-semibold px-2.5 py-1 rounded-full">Auto-included in PDF</span>
          </div>
          <div className="p-5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-teal-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm shrink-0">50%</div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Advance Payment</p>
                  <p className="text-xs text-gray-500">Before starting the project</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-teal-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm shrink-0">30%</div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">After Development</p>
                  <p className="text-xs text-gray-500">Before final delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-teal-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-white font-bold text-sm shrink-0">20%</div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">Final Payment</p>
                  <p className="text-xs text-gray-500">After project handover</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-teal-800 bg-teal-100 border border-teal-200 rounded-md px-3 py-2">
              <span className="font-semibold">Note:</span> Work will begin only after the initial advance payment is received.
            </p>
          </div>
        </div>
      )}

      {/* ── Photography Packages (non-web) ── */}
      {data.serviceType !== 'web-development' && (
        <FormSection id="photography" title="Photography Packages" icon={<Camera className="w-5 h-5" />}>
          <div className="space-y-4">
            {data.photographyItems.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg relative bg-white shadow-sm">
                <button
                  onClick={() => removePhotographyItem(item.id)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                ><Trash2 className="w-4 h-4" /></button>

                <div className="grid grid-cols-12 gap-4 pr-8">
                  <div className="col-span-12 sm:col-span-6 space-y-1.5">
                    <Label className="text-xs">Product / Category Name</Label>
                    <Input value={item.title} onChange={e => updatePhotographyItem(item.id, { title: e.target.value })} placeholder="e.g. T-Shirt Photography" />
                  </div>
                  <div className="col-span-12 sm:col-span-6 space-y-1.5">
                    <Label className="text-xs">Output (String)</Label>
                    <Input value={item.outputString} onChange={e => updatePhotographyItem(item.id, { outputString: e.target.value })} placeholder="e.g. 5 images per product" />
                  </div>
                  <div className="col-span-12 sm:col-span-4 space-y-1.5">
                    <Label className="text-xs">Quantity</Label>
                    <Input type="number" min={1} value={item.quantity} onChange={e => updatePhotographyItem(item.id, { quantity: Number(e.target.value) })} />
                  </div>
                  <div className="col-span-12 sm:col-span-4 space-y-1.5">
                    <Label className="text-xs">Rate Per Product / Item</Label>
                    <Input type="number" min={0} value={item.price} onChange={e => updatePhotographyItem(item.id, { price: Number(e.target.value) })} />
                  </div>
                  <div className="col-span-12 sm:col-span-4 space-y-1.5 flex flex-col justify-end">
                    <div className="h-10 flex items-center px-3 bg-gray-50 border border-gray-200 rounded-md font-semibold text-gray-700">
                      Subtotal: {item.quantity * item.price} {data.settings.currency}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addPhotographyItem} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Photography Item</Button>
          </div>
        </FormSection>
      )}

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

      {/* ── Web-Development specific modules ── */}
      {data.serviceType === 'web-development' && (
        <>
          {/* ── Scope of Work ── */}
          <FormSection id="scope" title="Scope of Work (Phases)" icon={<Briefcase className="w-5 h-5" />}>
            <div className="space-y-6">
              {/* Predefined Phases with Checkboxes */}
              {PREDEFINED_WEB_PHASES.map((phase, idx) => {
                const activePhase = data.scopeOfWork.find((p) => p.title === phase.title);
                const isPhaseActive = !!activePhase;

                return (
                  <div key={phase.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id={`phase-${phase.id}`}
                        checked={isPhaseActive}
                        onChange={(e) => {
                          if (e.target.checked) {
                            useQuotationStore.setState(state => ({
                              data: {
                                ...state.data,
                                scopeOfWork: [
                                  ...state.data.scopeOfWork,
                                  { id: Math.random().toString(36).substr(2, 9), title: phase.title, description: "", items: [...phase.items] }
                                ]
                              }
                            }))
                          } else {
                            if (activePhase) removeScopePhase(activePhase.id);
                          }
                        }}
                        className="w-5 h-5 text-teal-600 rounded border-gray-300 cursor-pointer accent-[#019689]"
                      />
                      <Label htmlFor={`phase-${phase.id}`} className="font-bold text-gray-900 cursor-pointer text-base">
                        Phase {idx + 1}: {phase.title}
                      </Label>
                    </div>

                    {isPhaseActive && (
                      <div className="ml-8 space-y-3">
                        {phase.items.map((item, i) => {
                          const isItemActive = activePhase.items.includes(item);
                          return (
                            <div key={i} className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                id={`item-${phase.id}-${i}`}
                                checked={isItemActive}
                                onChange={(e) => {
                                  const newItems = e.target.checked
                                    ? [...activePhase.items, item]
                                    : activePhase.items.filter(x => x !== item);
                                  updateScopePhase(activePhase.id, { items: newItems });
                                }}
                                className="w-4 h-4 mt-0.5 text-teal-600 rounded border-gray-300 cursor-pointer accent-[#019689]"
                              />
                              <Label htmlFor={`item-${phase.id}-${i}`} className="text-gray-700 text-sm cursor-pointer leading-tight">
                                {item}
                              </Label>
                            </div>
                          )
                        })}

                        {/* Render custom items added to this phase */}
                        {activePhase.items.filter(item => !phase.items.includes(item)).map((customItem, i) => (
                          <div key={`custom-${i}`} className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={true}
                              onChange={(e) => {
                                const newItems = activePhase.items.filter(x => x !== customItem);
                                updateScopePhase(activePhase.id, { items: newItems });
                              }}
                              className="w-4 h-4 mt-0.5 text-teal-600 rounded border-gray-300 cursor-pointer accent-[#019689]"
                            />
                            <Label className="text-gray-700 text-sm cursor-pointer leading-tight">
                              {customItem}
                            </Label>
                          </div>
                        ))}

                        {/* Add Custom Item Input */}
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                          <Input
                            placeholder="Add more item..."
                            className="h-8 text-sm flex-1 bg-white"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                                e.preventDefault();
                                const val = e.currentTarget.value.trim();
                                if (!activePhase.items.includes(val)) {
                                  updateScopePhase(activePhase.id, { items: [...activePhase.items, val] });
                                }
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                          <Button type="button" variant="outline" size="sm" className="h-8 text-xs bg-white" onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            const val = input.value.trim();
                            if (val && !activePhase.items.includes(val)) {
                              updateScopePhase(activePhase.id, { items: [...activePhase.items, val] });
                              input.value = '';
                            }
                          }}>
                            Add
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Custom Typed Phases */}
              {data.scopeOfWork.filter(p => !PREDEFINED_WEB_PHASES.some(pref => pref.title === p.title)).map((phase, idx) => (
                <div key={phase.id} className="p-4 border border-gray-200 rounded-lg relative bg-white">
                  <button
                    onClick={() => removeScopePhase(phase.id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  ><Trash2 className="w-4 h-4" /></button>
                  <div className="space-y-3">
                    <div className="space-y-1.5 w-full pr-8">
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Custom Phase Title</Label>
                      <Input value={phase.title} onChange={e => updateScopePhase(phase.id, { title: e.target.value })} />
                    </div>
                    <div className="space-y-3 mt-3">
                      {phase.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={true}
                            onChange={(e) => {
                              const newItems = phase.items.filter(x => x !== item);
                              updateScopePhase(phase.id, { items: newItems });
                            }}
                            className="w-4 h-4 mt-0.5 text-teal-600 rounded border-gray-300 cursor-pointer accent-[#019689]"
                          />
                          <Label className="text-gray-700 text-sm cursor-pointer leading-tight">
                            {item}
                          </Label>
                        </div>
                      ))}

                      {/* Add Custom Item Input */}
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                        <Input
                          placeholder="Add item..."
                          className="h-8 text-sm flex-1 bg-white"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                              e.preventDefault();
                              const val = e.currentTarget.value.trim();
                              if (!phase.items.includes(val)) {
                                updateScopePhase(phase.id, { items: [...phase.items, val] });
                              }
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <Button type="button" variant="outline" size="sm" className="h-8 text-xs bg-white" onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          const val = input.value.trim();
                          if (val && !phase.items.includes(val)) {
                            updateScopePhase(phase.id, { items: [...phase.items, val] });
                            input.value = '';
                          }
                        }}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addScopePhase} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Custom Phase</Button>
            </div>
          </FormSection>

          {/* ── Tech Stack ── */}
          <FormSection id="tech" title="Technology Stack" icon={<Cpu className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm">Frontend (Comma separated)</Label>
                <Input value={data.techStack.frontend.join(', ')} onChange={e => updateTechStack({ frontend: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="Next.js, Tailwind..." />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Backend (Comma separated)</Label>
                <Input value={data.techStack.backend.join(', ')} onChange={e => updateTechStack({ backend: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="Node.js, Express..." />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Database (Comma separated)</Label>
                <Input value={data.techStack.database?.join(', ')} onChange={e => updateTechStack({ database: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="PostgreSQL, MongoDB..." />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Tools (Comma separated)</Label>
                <Input value={data.techStack.tools.join(', ')} onChange={e => updateTechStack({ tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="Figma, GitHub..." />
              </div>
            </div>
          </FormSection>
        </>
      )}

      {/* ── Delivery Timeline ── */}
      {data.serviceType === 'web-development' && (
        <div className="grid grid-cols-1 gap-6">
          <FormSection id="delivery" title="Delivery Timeline" icon={<Clock className="w-5 h-5" />}>
            <Label className="text-xs mb-2 block text-gray-500">Timeline Description</Label>
            <Textarea value={data.deliveryTimeline} onChange={e => updateDeliveryTimeline(e.target.value)} rows={2} />
          </FormSection>
        </div>
      )}



      {/* ── Additional Services ── */}
      {data.serviceType === 'web-development' && (
        <FormSection id="additional" title="Additional Services" icon={<Plus className="w-5 h-5" />}>
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
                    <select
                      value={srv.type}
                      onChange={e => updateOptionalService(srv.id, { type: e.target.value as any })}
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none"
                    >
                      <option value="one-time">One Time</option>
                      <option value="recurring">Recurring (Yearly)</option>
                    </select>
                  </div>
                  <div className="col-span-12 space-y-1.5">
                    <Label className="text-xs">Description</Label>
                    <Textarea value={srv.description} onChange={e => updateOptionalService(srv.id, { description: e.target.value })} rows={1} />
                  </div>
                  <div className="col-span-12 space-y-1.5">
                    <Label className="text-xs">Features List (One per line, optional)</Label>
                    <Textarea value={srv.items.join('\n')} onChange={e => updateOptionalService(srv.id, { items: e.target.value.split('\n') })} rows={2} />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addOptionalService} variant="outline" className="w-full border-dashed"><Plus className="w-4 h-4 mr-2" /> Add Additional Service</Button>
          </div>
        </FormSection>
      )}

      {/* ── Workflow & Notes ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.serviceType === 'web-development' ? (
          <FormSection id="workflow" title="Workflow Summary" icon={<List className="w-5 h-5" />}>
            <Label className="text-xs mb-2 block text-gray-500">Ordered Steps (One per line)</Label>
            <Textarea value={data.workflow.join('\n')} onChange={e => handleListChange(e.target.value, updateWorkflow)} rows={5} />
          </FormSection>
        ) : <div />}
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
