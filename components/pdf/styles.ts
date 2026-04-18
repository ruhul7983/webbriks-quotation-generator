import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  // ── Page ──
  page: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.3,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 28,
  },

  // ── Header ──
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#019689',
  },
  companyInfo: {
    width: '50%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logo: {
    height: 30,
    objectFit: 'contain',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#019689',
    marginBottom: 3,
  },
  companyAddress: {
    fontSize: 7,
    color: '#6B7280',
    marginBottom: 1,
  },

  // ── Quotation Meta ──
  quotationMeta: {
    width: '45%',
    alignItems: 'flex-end',
  },
  titleLabel: {
    fontSize: 18,
    color: '#D1D5DB',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 1,
  },
  metaLabel: {
    fontSize: 7,
    color: '#6B7280',
    fontWeight: 700,
    width: 55,
    textAlign: 'right',
    marginRight: 5,
  },
  metaValue: {
    fontSize: 8,
    fontWeight: 600,
    color: '#111827',
    width: 80,
    textAlign: 'left',
  },

  // ── Quotation Title ──
  quotationTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#1F2937',
    marginBottom: 8,
  },

  // ── Client ──
  clientSection: {
    flexDirection: 'row',
    backgroundColor: '#F0F9F8',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCEAE8',
    marginBottom: 12,
  },
  clientCol: {
    width: '50%',
  },
  clientFor: {
    fontSize: 7,
    color: '#019689',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  clientName: {
    fontSize: 10,
    fontWeight: 700,
    color: '#111827',
  },
  clientCompany: {
    fontSize: 8,
    fontWeight: 600,
    color: '#374151',
  },
  clientDetail: {
    fontSize: 7,
    color: '#6B7280',
    marginTop: 1,
  },

  // ── Service & Package Banner ──
  serviceBanner: {
    backgroundColor: '#019689',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  serviceLabelSmall: {
    fontSize: 7,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  serviceName: {
    fontSize: 13,
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  serviceDescription: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 6,
  },
  packageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  packageName: {
    fontSize: 10,
    fontWeight: 700,
    color: '#FFFFFF',
  },
  packageTagline: {
    fontSize: 7,
    color: 'rgba(255,255,255,0.7)',
  },
  packagePrice: {
    fontSize: 14,
    fontWeight: 700,
    color: '#FFFFFF',
  },

  // ── Features ──
  sectionHeading: {
    fontSize: 8,
    fontWeight: 700,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  featureItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    paddingRight: 8,
  },
  featureCheck: {
    fontSize: 9,
    color: '#019689',
    marginRight: 4,
    marginTop: 1,
  },
  featureText: {
    fontSize: 9,
    color: '#374151',
    flex: 1,
  },

  // ── Project Scope Stats ──
  statsRow: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 700,
    color: '#019689',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 6,
    fontWeight: 600,
    color: '#6B7280',
    textTransform: 'uppercase',
  },

  // ── Technology Stack ──
  techSection: {
    marginBottom: 12,
  },
  techCategoryRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  techCategoryLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: '#6B7280',
    textTransform: 'uppercase',
    width: 55,
    marginTop: 2,
  },
  techBadgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 4,
  },
  techBadgeFrontend: {
    backgroundColor: '#EFF6FF',
    borderWidth: 0.5,
    borderColor: '#BFDBFE',
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  techBadgeFrontendText: {
    fontSize: 7,
    fontWeight: 600,
    color: '#1D4ED8',
  },
  techBadgeBackend: {
    backgroundColor: '#F0FDF4',
    borderWidth: 0.5,
    borderColor: '#BBF7D0',
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  techBadgeBackendText: {
    fontSize: 7,
    fontWeight: 600,
    color: '#15803D',
  },
  techBadgeDesign: {
    backgroundColor: '#FAF5FF',
    borderWidth: 0.5,
    borderColor: '#E9D5FF',
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  techBadgeDesignText: {
    fontSize: 7,
    fontWeight: 600,
    color: '#7C3AED',
  },

  // ── Delivery Timeline ──
  deliveryBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    padding: 10,
    marginBottom: 12,
  },
  deliveryText: {
    fontSize: 9,
    color: '#374151',
  },
  deliveryBold: {
    fontWeight: 700,
    color: '#019689',
  },
  deliverySmall: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 3,
  },

  // ── Totals ──
  totalsContainer: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  totalsBox: {
    width: 200,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalsLabel: { fontSize: 8, color: '#6B7280', fontWeight: 600 },
  totalsValue: { fontSize: 8, fontWeight: 600, color: '#374151' },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
  },
  grandTotalLabel: { fontSize: 11, fontWeight: 700, color: '#019689' },
  grandTotalValue: { fontSize: 11, fontWeight: 700, color: '#019689' },

  // ── Terms & Notes ──
  termsSection: {
    marginBottom: 10,
  },
  termsText: {
    fontSize: 7,
    color: '#6B7280',
    lineHeight: 1.5,
  },

  // ── Footer Note ──
  footerNote: {
    fontSize: 7,
    color: '#9CA3AF',
    marginTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#F3F4F6',
    paddingTop: 4,
  },

  // ── Footer ──
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 28,
    right: 28,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E7EB',
    paddingTop: 6,
  },
  signName: { fontSize: 8, fontWeight: 700, color: '#111827' },
  signRole: { fontSize: 7, color: '#6B7280' },
  signCompany: { fontSize: 7, fontWeight: 700, color: '#019689' },

  // ── Page Number ──
  pageNumber: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 7,
    color: '#9CA3AF',
  },
});
