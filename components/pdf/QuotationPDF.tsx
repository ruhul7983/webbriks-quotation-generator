import React from 'react';
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { styles } from './styles';
import { QuotationData } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';

interface QuotationPDFProps {
  data: QuotationData;
  packagePrice: number;
  taxAmount: number;
  grandTotal: number;
}

const chunk = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export const QuotationPDF = ({
  data,
  packagePrice,
  taxAmount,
  grandTotal,
}: QuotationPDFProps) => {
  const hasTech =
    data.techStack.frontend.length > 0 ||
    data.techStack.backend.length > 0 ||
    data.techStack.tools.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* ── HEADER ── */}
        <View style={styles.headerSection}>
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
            <Text style={{ ...styles.companyAddress, color: '#4B5563', marginTop: 3 }}>
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
                {data.details.date ? format(new Date(data.details.date), 'MMM dd, yyyy') : '-'}
              </Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Valid Until:</Text>
              <Text style={styles.metaValue}>
                {data.details.validUntil ? format(new Date(data.details.validUntil), 'MMM dd, yyyy') : '-'}
              </Text>
            </View>
          </View>
        </View>

        {/* ── TITLE ── */}
        <Text style={styles.quotationTitle}>{data.details.title}</Text>

        {/* ── CLIENT ── */}
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

        {/* ── OVERVIEW ── */}
        {data.overview && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionHeading}>Project Overview</Text>
            <Text style={{ fontSize: 10, color: '#374151', lineHeight: 1.5 }}>
              {data.overview}
            </Text>
          </View>
        )}

        {/* ── SCOPE OF WORK ── */}
        {data.scopeOfWork.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionHeading}>Scope of Work</Text>
            {data.scopeOfWork.map((phase, idx) => (
              <View key={phase.id} wrap={false} style={{ marginBottom: 10, padding: 8, backgroundColor: '#F9FAFB', borderLeftWidth: 3, borderLeftColor: '#019689' }}>
                <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#111827', marginBottom: 4 }}>
                  Phase {idx + 1}: {phase.title}
                </Text>
                {phase.description && <Text style={{ fontSize: 10, color: '#4B5563', marginBottom: 6, lineHeight: 1.4 }}>{phase.description}</Text>}
                {phase.items.map((item, i) => (
                  <View key={i} style={{ flexDirection: 'row', marginBottom: 3 }}>
                    <Text style={{ fontSize: 10, marginRight: 6, color: '#9CA3AF' }}>•</Text>
                    <Text style={{ fontSize: 10, color: '#374151', flex: 1, lineHeight: 1.3 }}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* ── TECH STACK ── */}
        {hasTech && (
          <View style={styles.techSection} wrap={false}>
            <Text style={{ ...styles.sectionHeading, borderBottomWidth: 0, marginBottom: 4 }}>Technology Stack</Text>

            {data.techStack.frontend.length > 0 && (
              <View style={styles.techCategoryRow}>
                <Text style={styles.techCategoryLabel}>Frontend</Text>
                <View style={styles.techBadgesWrap}>
                  {data.techStack.frontend.map((tech, i) => (
                    <View key={i} style={styles.techBadgeFrontend}>
                      <Text style={styles.techBadgeFrontendText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.techStack.backend.length > 0 && (
              <View style={styles.techCategoryRow}>
                <Text style={styles.techCategoryLabel}>Backend</Text>
                <View style={styles.techBadgesWrap}>
                  {data.techStack.backend.map((tech, i) => (
                    <View key={i} style={styles.techBadgeBackend}>
                      <Text style={styles.techBadgeBackendText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {data.techStack.tools.length > 0 && (
              <View style={styles.techCategoryRow}>
                <Text style={styles.techCategoryLabel}>Tools</Text>
                <View style={styles.techBadgesWrap}>
                  {data.techStack.tools.map((tool, i) => (
                    <View key={i} style={styles.techBadgeDesign}>
                      <Text style={styles.techBadgeDesignText}>{tool}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* ── PLATFORM FEATURES ── */}
        {data.features.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionHeading}>Platform Features</Text>
            <View style={styles.featuresGrid}>
              {chunk(data.features, 2).map((row, rowIdx) => (
                <View key={rowIdx} style={{ flexDirection: 'row', marginBottom: 6 }}>
                  {row.map((feature, i) => (
                    <View key={i} style={styles.featureItem} wrap={false}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── ADMIN DASHBOARD ── */}
        {data.adminFeatures.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionHeading}>Complete Admin Dashboard</Text>
            <View style={styles.featuresGrid}>
              {chunk(data.adminFeatures, 2).map((row, rowIdx) => (
                <View key={rowIdx} style={{ flexDirection: 'row', marginBottom: 6 }}>
                  {row.map((feature, i) => (
                    <View key={i} style={styles.featureItem} wrap={false}>
                      <Text style={{ fontSize: 11, marginRight: 6, color: '#9CA3AF' }}>•</Text>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── MARKETING SETUP ── */}
        {data.marketingSetup.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionHeading}>Marketing Setup</Text>
            <View style={styles.featuresGrid}>
              {chunk(data.marketingSetup, 2).map((row, rowIdx) => (
                <View key={rowIdx} style={{ flexDirection: 'row', marginBottom: 6 }}>
                  {row.map((item, i) => (
                    <View key={i} style={styles.featureItem} wrap={false}>
                      <Text style={{ fontSize: 11, marginRight: 6, color: '#9CA3AF' }}>•</Text>
                      <Text style={styles.featureText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── DELIVERY TIMELINE ── */}
        {data.deliveryTimeline && (
          <View wrap={false} style={styles.deliveryBox}>
            <Text style={styles.sectionHeading}>Delivery Timeline</Text>
            <Text style={styles.deliveryText}>{data.deliveryTimeline}</Text>
          </View>
        )}

        {/* ── PRICING MATRIX ── */}
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.sectionHeading}>Website Pricing</Text>
          
          <View style={{ flexDirection: 'column' }}>
            
            {/* Included / Not Included Lists stacked */}
            <View style={{ marginBottom: 10 }}>
              {data.pricing.included.length > 0 && (
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#111827', marginBottom: 6 }}>Included in this package:</Text>
                  <View style={styles.featuresGrid}>
                    {chunk(data.pricing.included, 2).map((row, rowIdx) => (
                      <View key={rowIdx} style={{ flexDirection: 'row', marginBottom: 4 }}>
                        {row.map((inc, i) => (
                          <View key={i} wrap={false} style={{ width: '50%', flexDirection: 'row', paddingRight: 10 }}>
                            <Text style={{ fontSize: 9, color: '#019689', marginRight: 6, fontFamily: 'Helvetica-Bold' }}>✓</Text>
                            <Text style={{ fontSize: 9, color: '#374151', flex: 1, lineHeight: 1.3 }}>{inc}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </View>
              )}
              {data.pricing.notIncluded.length > 0 && (
                <View>
                  <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#111827', marginBottom: 6 }}>Not Included:</Text>
                  <View style={styles.featuresGrid}>
                    {chunk(data.pricing.notIncluded, 2).map((row, rowIdx) => (
                      <View key={rowIdx} style={{ flexDirection: 'row', marginBottom: 4 }}>
                        {row.map((ninc, i) => (
                          <View key={i} wrap={false} style={{ width: '50%', flexDirection: 'row', paddingRight: 10 }}>
                            <Text style={{ fontSize: 9, color: '#9CA3AF', marginRight: 6, fontFamily: 'Helvetica-Bold' }}>✗</Text>
                            <Text style={{ fontSize: 9, color: '#6B7280', flex: 1, lineHeight: 1.3 }}>{ninc}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Totals Box Full Width */}
            <View wrap={false} style={styles.totalsBox}>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Base Cost</Text>
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
                  <Text style={styles.totalsLabel}>Discount</Text>
                  <Text style={styles.totalsValue}>
                    -{formatCurrency(data.settings.discount, data.settings.currency)}
                  </Text>
                </View>
              )}
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Total Investment</Text>
                <Text style={styles.grandTotalValue}>
                  {formatCurrency(grandTotal, data.settings.currency)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── OPTIONAL SERVICES ── */}
        {data.optionalServices.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionHeading}>Optional / Additional Services</Text>
            {data.optionalServices.map((srv) => (
              <View key={srv.id} wrap={false} style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 6, backgroundColor: '#FAFAFA' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#111827' }}>{srv.title}</Text>
                  <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#111827' }}>
                    {formatCurrency(srv.price, data.settings.currency)}{srv.type === 'recurring' ? ' / Yearly' : ''}
                  </Text>
                </View>
                {srv.description && <Text style={{ fontSize: 9, color: '#4B5563', marginBottom: 6, lineHeight: 1.4 }}>{srv.description}</Text>}
                {srv.items.length > 0 && (
                  <View style={{ marginTop: 4 }}>
                    {srv.items.map((item, i) => (
                      <View key={i} style={{ flexDirection: 'row', marginBottom: 3 }}>
                        <Text style={{ fontSize: 9, marginRight: 6, color: '#9CA3AF' }}>•</Text>
                        <Text style={{ fontSize: 9, color: '#374151', flex: 1, lineHeight: 1.3 }}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* ── WORKFLOW SUMMARY ── */}
        {data.workflow.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionHeading}>Workflow Summary</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {data.workflow.map((step, i) => (
                <View key={i} wrap={false} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 8 }}>
                  <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#111827', marginRight: 5 }}>{i + 1}.</Text>
                  <Text style={{ fontSize: 10, color: '#4B5563' }}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── FINAL NOTE ── */}
        {data.finalNote && (
          <View style={styles.termsSection} wrap={false}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#111827', marginBottom: 6, textTransform: 'uppercase' }}>Final Note</Text>
            <Text style={styles.termsText}>{data.finalNote}</Text>
          </View>
        )}

        {/* ── VALID UNTIL ── */}
        <Text style={styles.footerNote}>
          This quotation is valid until{' '}
          {data.details.validUntil ? format(new Date(data.details.validUntil), 'MMMM dd, yyyy') : '-'}
        </Text>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Text style={styles.signName}>Md. Ashaduzzaman</Text>
          <Text style={styles.signRole}>Founder and CEO</Text>
          <Text style={styles.signCompany}>WebBriks</Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};
