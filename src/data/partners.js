export const partners = [
  { id: 'P001', company: 'National Payment Solutions', contact: 'James Mitchell', email: 'james@nationalpay.com', type: 'Parent', status: 'Active', referralUrl: 'https://quickrefund.ai/r/nationalpay', parent: null, lastLogin: '2026-03-20', docCount: 8, merchantCount: 22 },
  { id: 'P002', company: 'Apex Merchant Services', contact: 'Sarah Chen', email: 'sarah@apexmerchant.com', type: 'Sub-Partner', status: 'Active', referralUrl: 'https://quickrefund.ai/r/apexmerchant', parent: 'P001', lastLogin: '2026-03-19', docCount: 5, merchantCount: 14 },
  { id: 'P003', company: 'Pacific Processing Group', contact: 'David Park', email: 'david@pacificprocessing.com', type: 'Sub-Partner', status: 'Active', referralUrl: 'https://quickrefund.ai/r/pacificproc', parent: 'P001', lastLogin: '2026-03-18', docCount: 4, merchantCount: 9 },
  { id: 'P004', company: 'Summit Acquiring', contact: 'Rachel Torres', email: 'rachel@summitacquiring.com', type: 'Parent', status: 'Active', referralUrl: 'https://quickrefund.ai/r/summitacq', parent: null, lastLogin: '2026-03-21', docCount: 7, merchantCount: 18 },
  { id: 'P005', company: 'Evergreen Payments', contact: 'Michael Russo', email: 'michael@evergreenpay.com', type: 'Standard', status: 'Active', referralUrl: 'https://quickrefund.ai/r/evergreen', parent: null, lastLogin: '2026-03-22', docCount: 6, merchantCount: 12 },
  { id: 'P006', company: 'Meridian Financial Tech', contact: 'Jennifer Walsh', email: 'jennifer@meridianft.com', type: 'Standard', status: 'Inactive', referralUrl: 'https://quickrefund.ai/r/meridianft', parent: null, lastLogin: '2026-01-15', docCount: 3, merchantCount: 5 },
  { id: 'P007', company: 'Coastal Payment Partners', contact: 'Kevin Nguyen', email: 'kevin@coastalpay.com', type: 'Sub-Partner', status: 'Active', referralUrl: 'https://quickrefund.ai/r/coastalpay', parent: 'P004', lastLogin: '2026-03-17', docCount: 4, merchantCount: 7 },
  { id: 'P008', company: 'Atlas Processing', contact: 'Amanda Rodriguez', email: 'amanda@atlasprocessing.com', type: 'Standard', status: 'Pending', referralUrl: 'https://quickrefund.ai/r/atlasproc', parent: null, lastLogin: null, docCount: 0, merchantCount: 0 },
];

export const currentPartner = partners.find(p => p.id === 'P005'); // Evergreen Payments = default demo
