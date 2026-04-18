'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { QuotationPDF } from './QuotationPDF';
import { QuotationData, Service, ServicePackage } from '@/types';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  data: QuotationData;
  service: Service;
  pkg: ServicePackage;
  totalAmounts: {
    packagePrice: number;
    taxAmount: number;
    grandTotal: number;
  };
}

export default function PDFDownloadBtn({ data, service, pkg, totalAmounts }: Props) {
  return (
    <PDFDownloadLink
      document={
        <QuotationPDF
          data={data}
          service={service}
          pkg={pkg}
          packagePrice={totalAmounts.packagePrice}
          taxAmount={totalAmounts.taxAmount}
          grandTotal={totalAmounts.grandTotal}
        />
      }
      fileName={`${data.details.quotationNumber}.pdf`}
    >
      {({ loading }) => (
        <Button className="bg-[#019689] hover:bg-[#019689]/90" disabled={loading}>
          <Download className="w-4 h-4 mr-2" />
          {loading ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
