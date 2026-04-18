import { create } from 'zustand';
import { QuotationData, Service, ServicePackage } from '@/types';
import { format } from 'date-fns';

const generateId = () => Math.random().toString(36).substr(2, 9);

interface QuotationStore {
  data: QuotationData;
  updateCompany: (company: Partial<QuotationData['company']>) => void;
  updateClient: (client: Partial<QuotationData['client']>) => void;
  updateDetails: (details: Partial<QuotationData['details']>) => void;
  updateSettings: (settings: Partial<QuotationData['settings']>) => void;
  setCustomNotes: (notes: string) => void;
  // Service CRUD
  addService: () => void;
  updateService: (id: string, updates: Partial<Omit<Service, 'id' | 'packages'>>) => void;
  removeService: (id: string) => void;
  selectService: (id: string) => void;
  // Package CRUD
  addPackage: (serviceId: string) => void;
  updatePackage: (serviceId: string, packageId: string, updates: Partial<Omit<ServicePackage, 'id'>>) => void;
  removePackage: (serviceId: string, packageId: string) => void;
  selectPackage: (packageId: string) => void;
}

const defaultServiceId = generateId();
const defaultPkg1Id = generateId();
const defaultPkg2Id = generateId();

const initialState: QuotationData = {
  company: {
    logo: '/assets/image/logo.svg',
    name: 'WebBriks',
    address: '115 Senpara Parbata (3rd floor of Sheltech Rubynur),\nBegum Rokeya Avenue, Mirpur,\nDhaka 1216, Bangladesh.',
    email: 'info@webbriks.com',
    phone: '+8801977201923',
    website: 'www.webbriks.com',
  },
  client: {
    contactName: 'Jane Doe',
    companyName: 'Acme Corp',
    address: '456 Business Ave, Suite 100, New York, NY 10001',
    email: 'jane.doe@acmecorp.com',
    phone: '+1 (555) 987-6543',
  },
  details: {
    title: 'Web Design & Development Service',
    quotationNumber: `QT-${format(new Date(), 'yyyyMMdd')}-01`,
    date: format(new Date(), 'yyyy-MM-dd'),
    validUntil: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
  },
  services: [
    {
      id: defaultServiceId,
      name: 'Frontend Development',
      description: 'Modern, responsive frontend development with cutting-edge technologies',
      packages: [
        {
          id: defaultPkg1Id,
          name: 'Starter Package',
          tagline: 'Perfect for small businesses and startups',
          features: [
            'Responsive Design',
            'Up to 5 Pages',
            'Contact Form Integration',
            'Basic SEO Setup',
            'Mobile-Friendly Layout',
            'Cross-Browser Support',
          ],
          frontendTech: ['HTML5', 'CSS3', 'JavaScript', 'React'],
          backendTech: [],
          designTools: ['Figma'],
          pages: '3-5',
          revisions: 2,
          deliveryDays: 15,
          supportDays: 15,
          price: 1500,
        },
        {
          id: defaultPkg2Id,
          name: 'Professional Package',
          tagline: 'Complete solution for growing businesses',
          features: [
            'Responsive Design',
            'Up to 12 Pages',
            'Advanced Forms & Validation',
            'SEO Optimization',
            'Performance Optimization',
            'Animations & Micro-interactions',
            'CMS Integration',
            'Analytics & Tracking Setup',
            'API Integration',
          ],
          frontendTech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
          backendTech: ['Node.js', 'Express.js', 'PostgreSQL'],
          designTools: ['Figma'],
          pages: '8-12',
          revisions: 4,
          deliveryDays: 30,
          supportDays: 30,
          price: 3500,
        },
      ],
    },
  ],
  selectedServiceId: defaultServiceId,
  selectedPackageId: defaultPkg1Id,
  customNotes:
    '• 50% advance payment required to begin the project.\n• Remaining 50% due upon project completion.\n• Additional revisions beyond the package limit will be billed separately.\n• Content (text, images) to be provided by the client.\n• Timeline begins after initial payment and content receipt.',
  settings: {
    currency: '$',
    taxRate: 0,
    discount: 0,
  },
};

export const useQuotationStore = create<QuotationStore>((set) => ({
  data: initialState,

  updateCompany: (company) =>
    set((state) => ({
      data: { ...state.data, company: { ...state.data.company, ...company } },
    })),

  updateClient: (client) =>
    set((state) => ({
      data: { ...state.data, client: { ...state.data.client, ...client } },
    })),

  updateDetails: (details) =>
    set((state) => ({
      data: { ...state.data, details: { ...state.data.details, ...details } },
    })),

  updateSettings: (settings) =>
    set((state) => ({
      data: { ...state.data, settings: { ...state.data.settings, ...settings } },
    })),

  setCustomNotes: (notes) =>
    set((state) => ({
      data: { ...state.data, customNotes: notes },
    })),

  // ── Service CRUD ──

  addService: () => {
    const newServiceId = generateId();
    const newPackageId = generateId();
    set((state) => ({
      data: {
        ...state.data,
        services: [
          ...state.data.services,
          {
            id: newServiceId,
            name: 'New Service',
            description: '',
            packages: [
              {
                id: newPackageId,
                name: 'Package 01',
                tagline: '',
                features: [],
                frontendTech: [],
                backendTech: [],
                designTools: [],
                pages: '',
                revisions: 2,
                deliveryDays: 14,
                supportDays: 7,
                price: 0,
              },
            ],
          },
        ],
        selectedServiceId: newServiceId,
        selectedPackageId: newPackageId,
      },
    }));
  },

  updateService: (id, updates) =>
    set((state) => ({
      data: {
        ...state.data,
        services: state.data.services.map((s) =>
          s.id === id ? { ...s, ...updates } : s
        ),
      },
    })),

  removeService: (id) =>
    set((state) => {
      const filtered = state.data.services.filter((s) => s.id !== id);
      const needsReselect = state.data.selectedServiceId === id;
      return {
        data: {
          ...state.data,
          services: filtered,
          selectedServiceId: needsReselect
            ? filtered[0]?.id || ''
            : state.data.selectedServiceId,
          selectedPackageId: needsReselect
            ? filtered[0]?.packages[0]?.id || ''
            : state.data.selectedPackageId,
        },
      };
    }),

  selectService: (id) =>
    set((state) => {
      const service = state.data.services.find((s) => s.id === id);
      return {
        data: {
          ...state.data,
          selectedServiceId: id,
          selectedPackageId: service?.packages[0]?.id || '',
        },
      };
    }),

  // ── Package CRUD ──

  addPackage: (serviceId) =>
    set((state) => {
      const service = state.data.services.find((s) => s.id === serviceId);
      const pkgNum = service ? service.packages.length + 1 : 1;
      const newId = generateId();
      return {
        data: {
          ...state.data,
          services: state.data.services.map((s) =>
            s.id === serviceId
              ? {
                ...s,
                packages: [
                  ...s.packages,
                  {
                    id: newId,
                    name: `Package ${String(pkgNum).padStart(2, '0')}`,
                    tagline: '',
                    features: [],
                    frontendTech: [],
                    backendTech: [],
                    designTools: [],
                    pages: '',
                    revisions: 2,
                    deliveryDays: 14,
                    supportDays: 7,
                    price: 0,
                  },
                ],
              }
              : s
          ),
        },
      };
    }),

  updatePackage: (serviceId, packageId, updates) =>
    set((state) => ({
      data: {
        ...state.data,
        services: state.data.services.map((s) =>
          s.id === serviceId
            ? {
              ...s,
              packages: s.packages.map((p) =>
                p.id === packageId ? { ...p, ...updates } : p
              ),
            }
            : s
        ),
      },
    })),

  removePackage: (serviceId, packageId) =>
    set((state) => {
      const service = state.data.services.find((s) => s.id === serviceId);
      if (!service) return state;
      const filtered = service.packages.filter((p) => p.id !== packageId);
      const needsReselect = state.data.selectedPackageId === packageId;
      return {
        data: {
          ...state.data,
          services: state.data.services.map((s) =>
            s.id === serviceId ? { ...s, packages: filtered } : s
          ),
          selectedPackageId: needsReselect
            ? filtered[0]?.id || ''
            : state.data.selectedPackageId,
        },
      };
    }),

  selectPackage: (packageId) =>
    set((state) => ({
      data: { ...state.data, selectedPackageId: packageId },
    })),
}));
