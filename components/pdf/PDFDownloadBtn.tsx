'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { QuotationPDF } from './QuotationPDF';
import { QuotationData } from '@/types';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  data: QuotationData;
  totalAmounts: {
    packagePrice: number;
    additionalTotal: number;
    taxAmount: number;
    grandTotal: number;
  };
}

export default function PDFDownloadBtn({ data, totalAmounts }: Props) {
  return (
    <PDFDownloadLink
      document={
        <QuotationPDF
          data={data}
          packagePrice={totalAmounts.packagePrice}
          additionalTotal={totalAmounts.additionalTotal}
          taxAmount={totalAmounts.taxAmount}
          grandTotal={totalAmounts.grandTotal}
        />
      }
      fileName={`${data.details.quotationNumber}.pdf`}
    >
      {({ loading }) => (
        <Button className="bg-gray-900 hover:bg-gray-800 text-white" disabled={loading}>
          {loading ? (
            <span className="flex items-center"><Download className="w-4 h-4 mr-2 animate-bounce" /> Generating...</span>
          ) : (
            <span className="flex items-center"><FileText className="w-4 h-4 mr-2" /> Download Document</span>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
