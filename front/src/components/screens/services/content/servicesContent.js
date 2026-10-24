import { SERVICES, SERVICE_GROUPS } from '../../../navigation/childNav/webNav/siteConfig';

const unsplash = (id, w = 1000) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80` });

// Placeholder copy in a friendly, short tone. Titles and one-line texts come from siteConfig.js.
// Edit `details` below to change what each service page section says.
const DETAILS = {
  websites: {
    bullets: ['Custom design that fits your brand', 'Works on phones, tablets and computers', 'Built to load fast and rank on Google', 'Contact forms, WhatsApp and booking links'],
    goodFor: 'Businesses that need a new site, or a redesign of one that is not working.',
    image: unsplash('photo-1507238691740-187a5b1d37b8', 900),
  },
  apps: {
    bullets: ['Mobile apps and web apps', 'Simple screens your customers can use at once', 'Logins, payments and notifications where needed', 'Support after launch'],
    goodFor: 'Businesses that want to sell, book or manage work through an app.',
    image: unsplash('photo-1551434678-e076c223a692', 900),
  },
  maintenance: {
    bullets: ['Security updates and backups', 'Fixes and content changes when you need them', 'Speed and uptime checks', 'A named person to call'],
    goodFor: 'Businesses with a live site that no one has time to look after.',
    image: unsplash('photo-1460925895917-afdab827c52f', 900),
  },
  seo: {
    bullets: ['Keyword research for what your customers search', 'Fixes to your site so Google can read it', 'New pages and articles that bring visitors', 'A clear monthly report'],
    goodFor: 'Businesses that want more enquiries from Google without paying for every click.',
    image: unsplash('photo-1432888498266-38ffec3eaf0a', 900),
  },
  marketing: {
    bullets: ['Campaigns for Google, Facebook and Instagram', 'Landing pages and sales funnels', 'Email and WhatsApp follow-up', 'Reports on leads and cost per lead'],
    goodFor: 'Businesses that want a steady flow of leads and a way to close them.',
    image: unsplash('photo-1556761175-5973dc0f32e7', 900),
  },
  social: {
    bullets: ['A content plan that fits your business', 'Posts, graphics and short videos', 'Replies to comments and messages', 'Monthly results in plain words'],
    goodFor: 'Businesses that want active pages without doing it all themselves.',
    image: unsplash('photo-1519389950473-47ba0277781c', 900),
  },
  design: {
    bullets: ['Logo design and brand colours', 'Brand kit: fonts, colours and rules', 'Social media graphics and flyers', 'Files ready for print and screen'],
    goodFor: 'New businesses, and established ones that want a fresh, consistent look.',
    image: unsplash('photo-1561070791-2526d30994b5', 900),
  },
};

export const SERVICES_PAGE = {
  hero: {
    title: 'Our services',
    text: 'Seven ways we help your business get online, get found and grow.',
    button: { label: 'Get a free proposal', route: 'Contact', params: { topic: 'Free proposal' } },
    image: unsplash('photo-1522202176988-66273c2fd55f', 1600),
  },

  jump: { label: 'Jump to a service' },

  groups: SERVICE_GROUPS.map((gr) => ({
    ...gr,
    items: SERVICES.filter((sv) => sv.group === gr.id).map((sv) => ({ ...sv, ...DETAILS[sv.id] })),
  })),
  labels: { includes: 'What you get', goodFor: 'Good for', button: 'Get a free proposal' },

  process: {
    title: 'How we work',
    steps: [
      { id: 's1', title: 'We talk', text: 'A free call to understand your business and goals.' },
      { id: 's2', title: 'We plan', text: 'You get a clear proposal with scope, timeline and price.' },
      { id: 's3', title: 'We build', text: 'We design and build, and show you progress along the way.' },
      { id: 's4', title: 'We launch and support', text: 'We go live together, then stay on hand to help you grow.' },
    ],
  },

  faq: {
    title: 'Questions about our services',
    items: [
      { id: 'f1', q: 'Can I buy just one service?', a: 'Yes. Many clients start with one, such as a website, and add others later. Everything we build works well together.' },
      { id: 'f2', q: 'Do you work with small businesses?', a: 'Yes. We work with start-ups, small businesses and larger companies, and we size the work to your budget.' },
      { id: 'f3', q: 'How do I get a price?', a: 'Ask for a free proposal. Tell us what you need and we will send a clear price with no hidden extras.' },
      { id: 'f4', q: 'Will I own my website and designs?', a: 'Yes. When the final payment is made, the site, files and designs are yours.' },
    ],
  },

  cta: {
    title: 'Not sure which service you need?',
    text: 'Tell us about your business and we will suggest the right place to start.',
    button: { label: 'Book a free meeting', route: 'Contact', params: { topic: 'Free proposal' } },
  },
};