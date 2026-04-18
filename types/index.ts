export interface CompanyDetails {
  logo?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
}

export interface ClientDetails {
  contactName: string;
  companyName: string;
  address: string;
  email: string;
  phone: string;
}

export interface QuotationDetails {
  title: string;
  quotationNumber: string;
  date: string;
  validUntil: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  frontendTech: string[];
  backendTech: string[];
  designTools: string[];
  pages: string;
  revisions: number;
  deliveryDays: number;
  supportDays: number;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  packages: ServicePackage[];
}

export interface QuotationData {
  company: CompanyDetails;
  client: ClientDetails;
  details: QuotationDetails;
  services: Service[];
  selectedServiceId: string;
  selectedPackageId: string;
  customNotes: string;
  settings: {
    currency: '$' | '৳';
    taxRate: number;
    discount: number;
  };
}
