import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  // ── Page ──
  page: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.3,
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 30,
    fontFamily: 'Helvetica',
  },

  // ── Header ──
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  companyInfo: {
    width: '50%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logo: {
    height: 35,
    objectFit: 'contain',
    marginBottom: 6,
  },
  companyName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  companyAddress: {
    fontSize: 8,
    color: '#6B7280',
    marginBottom: 2,
  },

  // ── Quotation Meta ──
  quotationMeta: {
    width: '45%',
    alignItems: 'flex-end',
  },
  titleLabel: {
    fontSize: 20,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  metaLabel: {
    fontSize: 8,
    color: '#6B7280',
    fontFamily: 'Helvetica-Bold',
    width: 60,
    textAlign: 'right',
    marginRight: 6,
  },
  metaValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    width: 80,
    textAlign: 'left',
  },

  // ── Quotation Title ──
  quotationTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── Client ──
  clientSection: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  clientCol: {
    width: '50%',
  },
  clientFor: {
    fontSize: 8,
    color: '#9CA3AF',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  clientCompany: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    marginTop: 2,
  },
  clientDetail: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 2,
  },

  // ── Service & Package Banner ──
  serviceBanner: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  serviceLabelSmall: {
    fontSize: 8,
    color: '#9CA3AF',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 10,
  },
  packageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    marginTop: 2,
  },
  packageName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  packageTagline: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 2,
  },
  packagePrice: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },

  // ── Features ──
  sectionHeading: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  featureItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingRight: 10,
  },
  featureCheck: {
    fontSize: 10,
    color: '#111827',
    marginRight: 6,
    fontFamily: 'Helvetica-Bold',
  },
  featureText: {
    fontSize: 9,
    color: '#374151',
    flex: 1,
  },

  // ── Project Scope Stats ──
  statsRow: {
    flexDirection: 'row',
    marginBottom: 18,
    gap: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    paddingVertical: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── Technology Stack ──
  techSection: {
    marginBottom: 16,
  },
  techCategoryRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  techCategoryLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#6B7280',
    textTransform: 'uppercase',
    width: 60,
    marginTop: 2,
  },
  techBadgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 4,
  },
  techBadgeFrontend: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  techBadgeFrontendText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
  },
  techBadgeBackend: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  techBadgeBackendText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
  },
  techBadgeDesign: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  techBadgeDesignText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
  },

  // ── Delivery Timeline ──
  deliveryBox: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  deliveryText: {
    fontSize: 9,
    color: '#374151',
  },
  deliveryBold: {
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  deliverySmall: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 4,
  },

  // ── Totals ──
  totalsContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
  },
  totalsBox: {
    width: 220,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalsLabel: { fontSize: 9, color: '#6B7280' },
  totalsValue: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#111827' },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
  },
  grandTotalLabel: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#111827' },
  grandTotalValue: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#111827' },

  // ── Terms & Notes ──
  termsSection: {
    marginBottom: 12,
  },
  termsText: {
    fontSize: 8,
    color: '#4B5563',
    lineHeight: 1.5,
  },

  // ── Footer Note ──
  footerNote: {
    fontSize: 8,
    color: '#9CA3AF',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
  },

  // ── Footer ──
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
  },
  signName: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#111827' },
  signRole: { fontSize: 7, color: '#6B7280', marginTop: 2 },
  signCompany: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#111827', marginTop: 2 },

  // ── Page Number ──
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#9CA3AF',
  },
});
