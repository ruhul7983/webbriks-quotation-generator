import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { styles } from './styles';
import { QuotationData, Service, ServicePackage } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';

interface QuotationPDFProps {
  data: QuotationData;
  service: Service;
  pkg: ServicePackage;
  packagePrice: number;
  taxAmount: number;
  grandTotal: number;
}

export const QuotationPDF = ({
  data,
  service,
  pkg,
  packagePrice,
  taxAmount,
  grandTotal,
}: QuotationPDFProps) => {
  const hasTech =
    pkg.frontendTech.length > 0 ||
    pkg.backendTech.length > 0 ||
    pkg.designTools.length > 0;

  return (
    <Document>
      {/* Single auto-flowing page — react-pdf will add pages automatically when content overflows */}
      <Page size="A4" style={styles.page} wrap>
        {/* Header — repeated on every page via fixed */}
        <View style={styles.headerSection} fixed>
          <View style={styles.companyInfo}>
            {data.company.logo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={data.company.logo} style={styles.logo} />
            ) : (
              <Text style={styles.companyName}>{data.company.name}</Text>
            )}
            <Text style={styles.companyAddress}>{data.company.address}</Text>
            <Text style={styles.companyAddress}>
              {data.company.email} | {data.company.phone}
            </Text>
            <Text style={{ ...styles.companyAddress, color: '#019689' }}>
              {data.company.website}
            </Text>
          </View>
          <View style={styles.quotationMeta}>
            <Text style={styles.titleLabel}>Quotation</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>ID:</Text>
              <Text style={styles.metaValue}>{data.details.quotationNumber}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Date:</Text>
              <Text style={styles.metaValue}>
                {data.details.date
                  ? format(new Date(data.details.date), 'MMM dd, yyyy')
                  : '-'}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Valid Until:</Text>
              <Text style={styles.metaValue}>
                {data.details.validUntil
                  ? format(new Date(data.details.validUntil), 'MMM dd, yyyy')
                  : '-'}
              </Text>
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.quotationTitle}>{data.details.title}</Text>

        {/* Client */}
        <View style={styles.clientSection}>
          <View style={styles.clientCol}>
            <Text style={styles.clientFor}>Quotation For:</Text>
            <Text style={styles.clientName}>{data.client.contactName}</Text>
            {data.client.companyName ? (
              <Text style={styles.clientCompany}>{data.client.companyName}</Text>
            ) : null}
          </View>
          <View style={styles.clientCol}>
            <Text style={styles.clientDetail}>{data.client.address}</Text>
            <Text style={styles.clientDetail}>{data.client.email}</Text>
            <Text style={styles.clientDetail}>{data.client.phone}</Text>
          </View>
        </View>

        {/* Service & Package Banner */}
        <View style={styles.serviceBanner}>
          <Text style={styles.serviceLabelSmall}>Service</Text>
          <Text style={styles.serviceName}>{service.name}</Text>
          {service.description ? (
            <Text style={styles.serviceDescription}>{service.description}</Text>
          ) : null}
          <View style={styles.packageRow}>
            <View>
              <Text style={styles.packageName}>{pkg.name}</Text>
              {pkg.tagline ? (
                <Text style={styles.packageTagline}>{pkg.tagline}</Text>
              ) : null}
            </View>
            <Text style={styles.packagePrice}>
              {formatCurrency(pkg.price, data.settings.currency)}
            </Text>
          </View>
        </View>

        {/* Features */}
        {pkg.features.length > 0 && (
          <View>
            <Text style={styles.sectionHeading}>What&apos;s Included</Text>
            <View style={styles.featuresGrid}>
              {pkg.features.map((feature, i) => (
                <View key={i} style={styles.featureItem} wrap={false}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Project Scope Stats */}
        <View style={styles.statsRow} wrap={false}>
          {pkg.pages ? (
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{pkg.pages}</Text>
              <Text style={styles.statLabel}>Pages</Text>
            </View>
          ) : null}
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{pkg.revisions}</Text>
            <Text style={styles.statLabel}>Revisions</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{pkg.deliveryDays}</Text>
            <Text style={styles.statLabel}>Delivery Days</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{pkg.supportDays}</Text>
            <Text style={styles.statLabel}>Support Days</Text>
          </View>
        </View>

        {/* Technology Stack */}
        {hasTech && (
          <View style={styles.techSection}>
            <Text style={styles.sectionHeading}>Technology Stack</Text>

            {pkg.frontendTech.length > 0 && (
              <View style={styles.techCategoryRow} wrap={false}>
                <Text style={styles.techCategoryLabel}>Frontend</Text>
                <View style={styles.techBadgesWrap}>
                  {pkg.frontendTech.map((tech, i) => (
                    <View key={i} style={styles.techBadgeFrontend}>
                      <Text style={styles.techBadgeFrontendText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {pkg.backendTech.length > 0 && (
              <View style={styles.techCategoryRow} wrap={false}>
                <Text style={styles.techCategoryLabel}>Backend</Text>
                <View style={styles.techBadgesWrap}>
                  {pkg.backendTech.map((tech, i) => (
                    <View key={i} style={styles.techBadgeBackend}>
                      <Text style={styles.techBadgeBackendText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {pkg.designTools.length > 0 && (
              <View style={styles.techCategoryRow} wrap={false}>
                <Text style={styles.techCategoryLabel}>Design</Text>
                <View style={styles.techBadgesWrap}>
                  {pkg.designTools.map((tool, i) => (
                    <View key={i} style={styles.techBadgeDesign}>
                      <Text style={styles.techBadgeDesignText}>{tool}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Delivery Timeline */}
        <View style={styles.deliveryBox} wrap={false}>
          <Text style={styles.sectionHeading}>Delivery Timeline</Text>
          <Text style={styles.deliveryText}>
            Estimated delivery within{' '}
            <Text style={styles.deliveryBold}>
              {pkg.deliveryDays} business days
            </Text>{' '}
            from project kickoff.
          </Text>
          <Text style={styles.deliverySmall}>
            Post-delivery support: {pkg.supportDays} days
          </Text>
        </View>

        {/* Investment Summary */}
        <View>
          <Text style={styles.sectionHeading}>Investment Summary</Text>
          <View style={styles.totalsContainer}>
            <View style={styles.totalsBox} wrap={false}>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Package Price</Text>
                <Text style={styles.totalsValue}>
                  {formatCurrency(packagePrice, data.settings.currency)}
                </Text>
              </View>
              {data.settings.taxRate > 0 && (
                <View style={styles.totalsRow}>
                  <Text style={styles.totalsLabel}>
                    Tax ({data.settings.taxRate}%)
                  </Text>
                  <Text style={styles.totalsValue}>
                    +{formatCurrency(taxAmount, data.settings.currency)}
                  </Text>
                </View>
              )}
              {data.settings.discount > 0 && (
                <View style={styles.totalsRow}>
                  <Text style={{ ...styles.totalsLabel, color: '#16A34A' }}>
                    Discount
                  </Text>
                  <Text style={{ ...styles.totalsValue, color: '#16A34A' }}>
                    -{formatCurrency(data.settings.discount, data.settings.currency)}
                  </Text>
                </View>
              )}
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>
                  {formatCurrency(grandTotal, data.settings.currency)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Terms & Conditions */}
        {data.customNotes && (
          <View style={styles.termsSection} wrap={false}>
            <Text style={styles.sectionHeading}>Terms & Conditions</Text>
            <Text style={styles.termsText}>{data.customNotes}</Text>
          </View>
        )}

        {/* Valid Until */}
        <Text style={styles.footerNote}>
          This quotation is valid until{' '}
          {data.details.validUntil
            ? format(new Date(data.details.validUntil), 'MMMM dd, yyyy')
            : '-'}
        </Text>

        {/* Footer — repeated on every page via fixed */}
        <View style={styles.footer} fixed>
          <Text style={styles.signName}>Md. Ashaduzzaman</Text>
          <Text style={styles.signRole}>Founder and CEO</Text>
          <Text style={styles.signCompany}>WebBriks</Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};
