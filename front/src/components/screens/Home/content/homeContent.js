import { SERVICES, SERVICE_GROUPS } from '../../../navigation/childNav/webNav/siteConfig';

// SAMPLE CONTENT: project names, client names, numbers and testimonials below are placeholders.
// Replace them with Janet's real work. Images are Unsplash photos; to swap one, copy the id
// from an Unsplash image URL (images.unsplash.com/<id>) and paste it into unsplash('<id>').
const unsplash = (id, w = 900) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80` });

const DETAILS = {
  branding: {
    enquire: 'Enquire about branding',
    bullets: ['Logo design with multiple concepts', 'Colour palette & typography system', 'Brand guidelines document'],
  },
  stationery: {
    enquire: 'Enquire about stationery',
    bullets: ['Business cards & letterheads', 'Invoices, ID cards & email signatures', 'Print-ready files for any printer'],
  },
  packaging: {
    enquire: 'Enquire about packaging',
    bullets: ['Boxes, pouches, bottles & labels', 'Dielines prepared for production', 'Designs that make products stand out'],
  },
  illustration: {
    enquire: 'Enquire about illustration',
    bullets: ['Custom vector illustrations', 'Icon sets & patterns', 'Artwork for print, web and merchandise'],
  },
  print: {
    enquire: 'Enquire about print design',
    bullets: ['Flyers, posters & brochures', 'Menus, tri-folds & one-pagers', 'Print-ready PDF with bleed marks'],
  },
  printing: {
    enquire: 'Enquire about printing',
    bullets: ['Business cards, banners, T-shirts & mugs', 'Trusted printers and quality checks', 'Delivery of finished prints'],
  },
  outdoor: {
    enquire: 'Enquire about outdoor design',
    bullets: ['Billboards & roll-up banners', 'Vehicle branding & shop signage', 'Large-format files at full resolution'],
  },
  social: {
    enquire: 'Enquire about social graphics',
    bullets: ['Post & carousel templates', 'Profile covers & story designs', 'Consistent look across every platform'],
  },
  marketing: {
    enquire: 'Enquire about marketing',
    bullets: ['Campaign visuals & promo materials', 'Google & Meta ad creatives', 'Email newsletter designs'],
  },
  decks: {
    enquire: 'Enquire about decks',
    bullets: ['Company profiles & pitch decks', 'Clear layouts and charts', 'Delivered as PowerPoint, Keynote or PDF'],
  },
  web: {
    enquire: 'Enquire about website design',
    bullets: ['Website & landing page designs in Figma', 'Mobile, tablet & desktop layouts', 'Matched to your brand, ready for a developer'],
  },
  app: {
    enquire: 'Enquire about app design',
    bullets: ['App screens & clickable prototypes', 'Simple, easy-to-use layouts', 'Developer-ready files and assets'],
  },
};

export const HOME = {
  // ---------------- Hero ----------------
  hero: {
    eyebrow: 'Graphic, Print, Web & App Designer',
    title: 'Best graphic design, printing and web design for your business.',
    tag: 'Designing for your business',
    typing: { prefix: 'Hi, I\u2019m Janet. I design ', words: ['logos.', 'packaging.', 'printed materials.', 'websites.', 'app screens.'] },
    badge: { text: '30+ client reviews' },
    ticker: ['Best-rated graphic designer', 'Collaborative process', 'Print-ready files', 'Fast turnaround'],
    newProject: 'New Project?',
    text: [
      'Hi, I\u2019m Janet, a designer who creates ',
      { b: 'logos, brand identities, print and printing, marketing materials, websites and app designs' },
      ' for businesses that want to be taken seriously. You work directly with me, from the first sketch to the final product, using tools like ',
      { b: 'Adobe Illustrator, Photoshop, InDesign and Figma' },
      '.',
    ],
    primary: { label: 'Start a project', anchor: 'contact' },
    secondary: { label: 'Chat on WhatsApp' },
    photo: unsplash('photo-1494790108377-be9c29b29330', 1000),
    cards: {
      top: { icon: 'palette', title: 'Brand & Print', text: 'Logos, packaging, flyers and printing.' },
      bottom: { icon: 'web', title: 'Web & App Design', text: 'Websites, app screens and marketing visuals.' },
    },
    strengths: ['Logo & Branding', 'Printing', 'Marketing', 'Website Design', 'App UI/UX', 'Packaging'],
  },

  // ---------------- Intro ----------------
  intro: {
    id: 'intro',
    text: 'Janet Kamau offers expert graphic design, printing, marketing and web and app design that elevates your brand with visually compelling, on-brand materials. Designs are delivered on time and within budget to drive results and support your business goals.',
    link: { label: 'Trust the expert', anchor: 'contact' },
  },

  // ---------------- Section labels ----------------
  labels: {
    work: 'Graphic Design Case Studies',
    clients: 'Clients',
    services: 'Design Services',
    why: 'Why Janet',
    process: 'Process',
    words: 'Client Words',
    packages: 'Packages',
    faqs: 'FAQs',
  },

  // ---------------- Clients (SAMPLE names) ----------------
  clients: ['Savanna Coffee', 'Zuri Beauty', 'Mkulima Fresh', 'Nairobi Tech Summit', 'Kito Interiors', 'FitHub Gym', 'Tamu Bakery', 'Lakeview Estates'],

  // ---------------- Closing call to action ----------------
  cta: { text: 'Starting a new project or want to collaborate with me?', link: 'Let\u2019s talk' },

  // ---------------- Stats ----------------
  stats: {
    id: 'stats',
    items: [
      { id: 'n1', value: '50+', label: 'successful projects: branding, printing, marketing, web and app design' },
      { id: 'n2', value: '30+', label: 'happy clients across retail, food, property and events' },
      { id: 'n3', value: '5', label: 'years designing brands and products for customers' },
    ],
  },

  // ---------------- Services ----------------
  services: {
    id: 'services',
    eyebrow: 'Services',
    title: ['Graphic design for every ', 'part of your brand', '.'],
    text: 'From a first logo to printed materials, marketing campaigns, websites and app designs, everything looks consistent and is ready to use.',
    groupText: {
      brand: 'Your logo, colours and typography are the foundation. I create identities, stationery, packaging and illustrations that make your business look consistent and professional everywhere.',
      print: 'Print design and printing in one place. I design flyers, posters and brochures, then manage printing on paper, banners, T-shirts and more, so what you get matches what you approved.',
      marketing: 'Campaign visuals, social media graphics, ad creatives and pitch decks built to bring in customers and explain your offer clearly.',
      digital: 'Website, landing page and mobile app designs that are easy to use, match your brand and are ready to hand to a developer.',
    },
    items: (SERVICES || []).map((sv) => ({
      ...sv,
      ...(DETAILS[sv.id] || { enquire: 'Enquire about service', bullets: [] }),
      groupLabel: SERVICE_GROUPS.find((gr) => gr.id === sv.group)?.label || 'General',
    })),
  },

  // ---------------- Why work with me ----------------
  why: {
    id: 'why',
    eyebrow: 'Why work with me',
    title: ['Design that is clear, consistent and ', 'ready to use', '.'],
    text: 'Good design is half creative and half careful execution. You get both, with files that work the first time.',
    photo: unsplash('photo-1573496359142-b8d87734a5a2', 1000),
    name: 'Janet Kamau',
    role: 'Graphic Designer',
    button: { label: 'Discuss your project', anchor: 'contact' },
    reasons: [
      { id: 'r1', tag: 'Brand', icon: 'palette', title: 'A look that is yours', text: 'Every project starts with your business, your customers and your goals, so the result does not look like a template.' },
      { id: 'r2', tag: 'Consistency', icon: 'layers', title: 'Consistency everywhere', text: 'Your logo, flyers, social posts and packaging all follow one system, so your brand is easy to recognise.' },
      { id: 'r3', tag: 'Print', icon: 'print', title: 'Print-ready, every time', text: 'Files are prepared with the right sizes, colours and bleed, so your printer gets it right the first time.' },
      { id: 'r4', tag: 'Delivery', icon: 'schedule', title: 'On time and on budget', text: 'Clear timelines and fixed quotes, with updates along the way so nothing surprises you.' },
      { id: 'r5', tag: 'Ownership', icon: 'folder', title: 'You own the files', text: 'Final source files and usage rights are handed over at the end of the project.' },
      { id: 'r6', tag: 'Service', icon: 'devices', title: 'One designer for print, web and app', text: 'Your logo, printed materials, marketing and website all come from one person, so everything matches. Quick answers on WhatsApp keep projects moving.' },
    ],
  },

  // ---------------- Projects (SAMPLE projects) ----------------
  projects: {
    id: 'projects',
    eyebrow: 'Selected Work',
    title: ['Recent ', 'brand and design projects', ''],
    text: 'A selection of identities, packaging, print pieces and campaigns for businesses and organisations.',
    linkLabel: 'View project',
    items: [
      {
        id: 'p1', type: 'Branding & Packaging',
        title: 'Savanna Coffee Co.',
        text: 'Full brand identity for a Kenyan coffee roaster, including logo, bag packaging, labels and a social media kit.',
        did: ['Logo', 'Packaging', 'Labels', 'Social Kit'],
        result: 'Launched in 3 retail stores',
        image: unsplash('photo-1495474472287-4d71bcdd2085', 800),
        url: null,
      },
      {
        id: 'p2', type: 'Packaging & Marketing',
        title: 'Zuri Beauty',
        text: 'Label and box design for a natural skincare range, plus launch ads and social posts in the same soft colour system.',
        did: ['Packaging', 'Labels', 'Ad Campaign', 'Printing'],
        result: 'Shelf-ready range of 8 products',
        image: unsplash('photo-1596462502278-27bfdc403348', 800),
        url: null,
      },
      {
        id: 'p3', type: 'Logo & Brand Identity',
        title: 'Mkulima Fresh',
        text: 'Logo, colour palette and delivery van branding for a fresh produce supplier serving restaurants and homes.',
        did: ['Logo', 'Brand Guidelines', 'Vehicle Branding'],
        result: 'Consistent brand on 6 delivery vans',
        image: unsplash('photo-1542838132-92c53300491e', 800),
        url: null,
      },
      {
        id: 'p4', type: 'Event, Print & Web',
        title: 'Nairobi Tech Summit',
        text: 'Event website design, posters, roll-up banners, badges and social media graphics for a two-day technology conference.',
        did: ['Website Design', 'Posters', 'Banners', 'Printing'],
        result: 'Full event kit delivered in 7 days',
        image: unsplash('photo-1540575467063-178a50c2df87', 800),
        url: null,
      },
      {
        id: 'p5', type: 'Branding & Website',
        title: 'Kito Interiors',
        text: 'A refined identity and portfolio website design for an interior design studio, with stationery and a printed brochure.',
        did: ['Logo', 'Website Design', 'Stationery', 'Brochure'],
        result: 'A premium look for high-value clients',
        image: unsplash('photo-1618221195710-dd6b41faaea6', 800),
        url: null,
      },
      {
        id: 'p6', type: 'App Design & Social Media',
        title: 'FitHub Gym',
        text: 'Member app screens and a clickable prototype, plus bold post templates and promo flyers for the gym\u2019s feed.',
        did: ['App UI/UX', 'Prototype', 'Post Templates', 'Flyers'],
        result: 'App and templates used every week',
        image: unsplash('photo-1534438327276-14e5300c3a48', 800),
        url: null,
      },
      {
        id: 'p7', type: 'Branding & Printing',
        title: 'Tamu Bakery',
        text: 'Hand-drawn logo, menu boards, cake boxes and stickers for a neighbourhood bakery, designed and printed.',
        did: ['Logo', 'Menus', 'Boxes', 'Printing'],
        result: 'A friendly brand customers remember',
        image: unsplash('photo-1509440159596-0249088772ff', 800),
        url: null,
      },
      {
        id: 'p8', type: 'Web, Print & Pitch Deck',
        title: 'Lakeview Estates',
        text: 'A property landing page design, printed brochure and investor deck with clear layouts and floor plan graphics.',
        did: ['Landing Page', 'Brochure', 'Pitch Deck'],
        result: 'Used to present to 20+ investors',
        image: unsplash('photo-1560518883-ce09059eeffa', 800),
        url: null,
      },
      {
        id: 'p9', type: 'Illustration & Print',
        title: 'Pamoja Foundation',
        text: 'Annual report layout, custom illustrations and fundraising flyers for a community non-profit.',
        did: ['Report Layout', 'Illustration', 'Flyers'],
        result: 'A clear, engaging annual report',
        image: unsplash('photo-1488521787991-ed7bbaae773c', 800),
        url: null,
      },
    ],
  },

  // ---------------- Process ----------------
  process: {
    id: 'process',
    eyebrow: 'Design Process',
    title: ['From first brief to ', 'final files', '.'],
    text: 'A simple, clear process so you always know what happens next.',
    steps: [
      { id: 's1', title: 'Brief & Discovery', text: 'We talk about your business, your audience, your competitors and what you need the design to do.' },
      { id: 's2', title: 'Concepts & Moodboards', text: 'I share initial directions, colours and type options so we agree on the look before details.' },
      { id: 's3', title: 'Design & Refinement', text: 'I develop the chosen direction and refine it with your feedback over up to three revision rounds.' },
      { id: 's4', title: 'Final Files, Printing & Handover', text: 'You receive print-ready and web-ready files. If you need printing, I manage it and check quality before delivery. Website and app designs are handed over ready for a developer.' },
      { id: 's5', title: 'Ongoing Support', text: 'Need more designs later? I keep your files and brand system ready for new projects.' },
    ],
  },

  // ---------------- Testimonials (SAMPLE quotes) ----------------
  testimonials: {
    id: 'testimonials',
    eyebrow: 'Kind Words',
    title: ['What clients say about ', 'working with Janet', '.'],
    items: [
      { id: 't1', quote: 'Janet understood our brand from the first call. The logo and packaging look far more premium than we expected.', name: 'Wanjiru M.', role: 'Founder, Savanna Coffee Co.' },
      { id: 't2', quote: 'Fast replies, clear updates and files that our printer could use straight away. No back and forth.', name: 'Brian O.', role: 'Events Manager, Nairobi Tech Summit' },
      { id: 't3', quote: 'Our social media finally looks consistent. The templates save us hours every week.', name: 'Faith K.', role: 'Owner, FitHub Gym' },
    ],
  },

  // ---------------- Packages ----------------
  packages: {
    id: 'packages',
    eyebrow: 'Packages',
    title: ['Clear pricing for ', 'every kind of project', '.'],
    text: 'Choose a package or ask for a custom quote. Every project includes source files and usage rights.',
    price: 'Custom Quote',
    button: { label: 'Request a quote', anchor: 'contact' },
    items: [
      {
        id: 'pk1', name: 'Logo Starter', best: 'For new businesses that need a professional logo', featured: false,
        includes: ['3 logo concepts', '3 revision rounds', 'Colour palette & fonts', 'All logo file formats', 'Business card design'],
      },
      {
        id: 'pk2', name: 'Complete Brand Identity', best: 'Most popular for growing businesses', featured: true, tag: 'Most Popular',
        includes: ['Logo & logo variations', 'Brand guidelines document', 'Stationery & business cards', 'Social media starter kit', 'Print-ready & web-ready files'],
      },
      {
        id: 'pk3', name: 'Monthly Design Retainer', best: 'For businesses that need regular design work', featured: false,
        includes: ['Social media posts every month', 'Flyers, posters, ads & print jobs', 'Website or landing page updates', 'Priority turnaround', 'Direct WhatsApp support'],
      },
    ],
  },

  // ---------------- About me ----------------
  about: {
    id: 'about',
    eyebrow: 'About Janet',
    title: 'A designer who cares about the details',
    paragraphs: [
      'I\u2019m Janet Kamau, a designer who helps businesses look professional and be remembered. I design logos, brand identities, printed materials, packaging, marketing campaigns, websites and app screens.',
      'I believe good design is simple, clear and built to be used. That means thinking about where your design will appear, who will see it, and making sure every file works in the real world.',
      'Whether you are launching a new brand or refreshing an existing one, you work directly with me from the first conversation to the final delivery.',
    ],
    chips: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma', 'CorelDRAW', 'Brand Identity', 'Printing', 'Marketing', 'Website Design', 'App UI/UX', 'Packaging', 'Typography'],
    photo: unsplash('photo-1561070791-2526d30994b5', 1000),
    button: { label: 'Get in touch', anchor: 'contact' },
  },

  // ---------------- FAQs ----------------
  faqs: {
    id: 'faqs',
    eyebrow: 'Frequently Asked Questions',
    title: 'Got questions? Here are the answers.',
    items: [
      { id: 'f1', q: 'How long does a logo or brand identity take?', a: 'A logo usually takes 1 to 2 weeks. A full brand identity takes 3 to 4 weeks, depending on how quickly feedback comes in.' },
      { id: 'f2', q: 'How many revisions are included?', a: 'Every project includes up to three revision rounds. Extra rounds can be added if you need them.' },
      { id: 'f3', q: 'Will I get the source files?', a: 'Yes. You receive the final files in every format you need (print, web and editable source files) along with full usage rights.' },
      { id: 'f4', q: 'Do you also handle the printing?', a: 'Yes. I can design and manage printing through trusted printers, from business cards and banners to T-shirts and packaging. You can also take the print-ready files to your own printer.' },
      { id: 'f4b', q: 'Do you design websites and mobile apps?', a: 'Yes. I design websites, landing pages and app screens in Figma, with layouts for mobile and desktop. The files are ready to hand to a developer, mine or yours.' },
      { id: 'f5', q: 'How do payments work?', a: 'Projects start with a deposit, and the balance is paid before final files are released. I accept M-Pesa, bank transfer and cash.' },
      { id: 'f6', q: 'How can I get started?', a: 'Message me on WhatsApp or fill out the contact form below. Tell me about your project and I will send a free quote.' },
    ],
  },

  // ---------------- Quote ----------------
  quote: {
    id: 'quote',
    text: 'Good design is half creative and half careful execution. Work with a designer who delivers both.',
  },

  // ---------------- Contact ----------------
  contact: {
    id: 'contact',
    eyebrow: 'Get In Touch',
    heading: 'Contact Janet Kamau for design, printing and web services',
    title: ['Let\u2019s design your ', 'next project', '.'],
    text: 'Fill out the form or chat on WhatsApp to get a free quote.',
    labels: { phone: 'Phone', whatsapp: 'WhatsApp', email: 'Email', hours: 'Working Hours' },
    whatsappText: 'Chat with me instantly on WhatsApp',
    form: {
      topicLabel: 'I\u2019m interested in\u2026',
      topics: ['Logo & Branding', 'Printing & Flyers', 'Marketing Campaign', 'Social Media Graphics', 'Website Design', 'App Design', 'Packaging', 'Other'],
      budgetLabel: 'Approximate budget',
      budgetPlaceholder: 'Tell us your approximate budget',
      budgets: ['Under KES 10,000', 'KES 10,000 to 30,000', 'KES 30,000 to 80,000', 'Over KES 80,000'],
      fields: [
        { key: 'name', label: 'Full Name', required: true, half: true },
        { key: 'email', label: 'Email Address', required: true, half: true, keyboard: 'email-address' },
        { key: 'phone', label: 'Phone Number (WhatsApp)', required: true, half: true, keyboard: 'phone-pad' },
        { key: 'company', label: 'Company / Brand Name', required: false, half: true },
        { key: 'message', label: 'Tell me about your project', required: true, multiline: true },
      ],
      submit: 'Send Inquiry',
      note: 'I typically respond within a few hours during working hours.',
      success: 'Thank you! Your inquiry has been received. I will reach out shortly.',
    },
  },
};