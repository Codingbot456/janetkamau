// siteConfig.js - Header, footer, and contact details for Janet Kamau's portfolio.
// TODO: replace every PLACEHOLDER value below with Janet's real details.
export const SITE = {
  name: 'Janet Kamau',
  initial: 'J',                                   // Logo mark initial
  role: 'Graphic, Print, Web & App Designer',
  agency: 'Janet Kamau Design',
  domain: 'janetkamau.com',                       // PLACEHOLDER
  email: 'hello@janetkamau.com',                  // PLACEHOLDER
  phones: ['+254 700 000 000'],                   // PLACEHOLDER
  whatsapp: '254700000000',                       // PLACEHOLDER, international format without + or spaces
  whatsappMessage: 'Hi Janet, I saw your portfolio and would like to discuss a design project.',
  addressLines: ['Nairobi, Kenya'],               // PLACEHOLDER
  hours: 'Mon to Sat, 8:00 am to 6:00 pm EAT',
  logo: null,
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },
};

// Service groups (shown as small tags on each service card)
export const SERVICE_GROUPS = [
  { id: 'brand', label: 'Brand Identity' },
  { id: 'print', label: 'Print & Printing' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'digital', label: 'Web & App Design' },
];

export const SERVICES = [
  { id: 'branding', group: 'brand', title: 'Logo & Brand Identity', icon: 'palette', text: 'Logos, colour palettes, typography and brand guidelines that make your business instantly recognisable.' },
  { id: 'stationery', group: 'brand', title: 'Stationery & Corporate Kits', icon: 'style', text: 'Business cards, letterheads, invoices, ID cards and branded merchandise that look consistent everywhere.' },
  { id: 'packaging', group: 'brand', title: 'Packaging & Labels', icon: 'inventory-2', text: 'Product packaging, labels and stickers designed to stand out on the shelf and in the hand.' },
  { id: 'illustration', group: 'brand', title: 'Illustration & Custom Artwork', icon: 'brush', text: 'Custom illustrations, icons and vector artwork made for your brand.' },
  { id: 'print', group: 'print', title: 'Flyers, Posters & Brochures', icon: 'print', text: 'Print-ready flyers, posters, tri-folds and menus with clean layouts that get read.' },
  { id: 'printing', group: 'print', title: 'Printing & Branded Merchandise', icon: 'local-printshop', text: 'Your designs printed on paper, banners, T-shirts, mugs and more, with quality checked before delivery.' },
  { id: 'outdoor', group: 'print', title: 'Banners, Signage & Outdoor', icon: 'storefront', text: 'Billboards, roll-up banners, vehicle branding and signage that work from a distance.' },
  { id: 'social', group: 'marketing', title: 'Social Media Graphics', icon: 'share', text: 'Post templates, carousels, covers and story designs that keep your feed consistent.' },
  { id: 'marketing', group: 'marketing', title: 'Marketing & Ad Campaigns', icon: 'campaign', text: 'Campaign visuals, email designs and Google and Meta ad creatives built to bring in customers.' },
  { id: 'decks', group: 'marketing', title: 'Presentation & Pitch Decks', icon: 'slideshow', text: 'Company profiles, investor decks and proposals designed to look sharp and be easy to follow.' },
  { id: 'web', group: 'digital', title: 'Website Design', icon: 'web', text: 'Modern, mobile-friendly website and landing page designs that match your brand and turn visitors into leads.' },
  { id: 'app', group: 'digital', title: 'Mobile App UI/UX Design', icon: 'phone-iphone', text: 'Clear, easy-to-use app screens and prototypes, ready to hand over to a developer.' },
];

// One-page navigation anchors
export const NAV = [
  { id: 'home', label: 'Home', anchor: 'home' },
  { id: 'services', label: 'Services', anchor: 'services' },
  { id: 'why', label: 'Why me', anchor: 'why' },
  { id: 'projects', label: 'Work', anchor: 'projects' },
  { id: 'process', label: 'Process', anchor: 'process' },
  { id: 'about', label: 'About', anchor: 'about' },
  { id: 'faqs', label: 'FAQs', anchor: 'faqs' },
  { id: 'contact', label: 'Contact', anchor: 'contact' },
];

// Extra menu items in expanded navigation
export const NAV_MORE = [
  { id: 'packages', label: 'Packages', anchor: 'packages' },
];

// Top menu CTA button
export const CTA = { label: 'Contact', anchor: 'contact' };

// Footer configuration
export const FOOTER = {
  blurb: 'Graphic designer creating logos, brand identities, print and printing, marketing materials, websites and app designs for businesses that want to look professional.',
  headings: { services: 'Services', links: 'Quick links', contact: 'Contact' },
  links: [
    { id: 'l1', label: 'Why work with me', anchor: 'why' },
    { id: 'l2', label: 'Work', anchor: 'projects' },
    { id: 'l3', label: 'My process', anchor: 'process' },
    { id: 'l4', label: 'Packages', anchor: 'packages' },
    { id: 'l5', label: 'FAQs', anchor: 'faqs' },
    { id: 'l6', label: 'Contact', anchor: 'contact' },
  ],
  rights: 'All rights reserved.',
};

// Bottom quick-action contact bar
export const BAR = { call: 'Call now', whatsapp: 'WhatsApp', quote: 'Free quote', quoteAnchor: 'contact' };