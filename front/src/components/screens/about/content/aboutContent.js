import { SERVICES, SERVICE_GROUPS } from '../../../navigation/childNav/webNav/siteConfig';

const unsplash = (id, w = 1000) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80` });

// Placeholder copy in a friendly, short tone. Replace the quote, names and project examples with real ones.
export const ABOUT = {
  hero: {
    title: 'A digital agency that helps your business get found and chosen.',
    text: 'Websites, apps, SEO, marketing, social media and design from one friendly team.',
    button: { label: 'Get a free proposal', route: 'Contact', params: { topic: 'Free proposal' } },
    image: unsplash('photo-1531403009284-440f080d1e12', 1600),
  },

  intro: {
    eyebrow: 'About us',
    title: 'Who we are',
    paragraphs: [
      'DesignGENIUS is a digital agency based in Kenya. We build websites and apps that look good, load fast and bring in customers. Our aim is simple: make it easy for businesses of every size to look professional and grow online.',
      'We keep things clear. You get plain-language advice, honest timelines and a team that answers your messages. From the first idea to the day you go live, and after, we work closely with you.',
    ],
    checks: ['Experienced designers and developers', 'Quick replies, six days a week', 'References available on request'],
    button: { label: 'Get a free proposal', route: 'Contact', params: { topic: 'Free proposal' } },
    image: unsplash('photo-1498050108023-c5249f4df085', 1000),
  },

  // One card per service group (Build, Grow, Brand), built from siteConfig.js
  groups: {
    linkLabel: 'Find out more',
    items: SERVICE_GROUPS.map((gr) => ({
      ...gr,
      icon: { build: 'web', grow: 'trending-up', brand: 'brush' }[gr.id],
      text: {
        build: 'We design and build websites and apps, and keep them secure and running.',
        grow: 'We bring you customers with SEO, marketing and social media.',
        brand: 'We make your business look the part, everywhere people see it.',
      }[gr.id],
      services: SERVICES.filter((sv) => sv.group === gr.id).map((sv) => sv.title),
      route: 'Services',
      params: { service: SERVICES.find((sv) => sv.group === gr.id).id },
    })),
  },

  quote: {
    text: 'From the first call to launch day, they were clear, quick and honest. Our new website brought in enquiries within the first week. I would recommend them to any business owner.',
    name: 'Client name',
    role: 'A very happy customer',
  },

  work: {
    items: [
      { id: 'k1', title: 'Company websites', text: 'Clean, fast sites that explain what you do and make it easy to get in touch.', image: unsplash('photo-1507238691740-187a5b1d37b8', 800) },
      { id: 'k2', title: 'Web and mobile apps', text: 'Tools your customers and staff can use every day, built around real needs.', image: unsplash('photo-1551434678-e076c223a692', 800) },
      { id: 'k3', title: 'Brand and design', text: 'Logos and visuals that give your business a look people remember.', image: unsplash('photo-1432888498266-38ffec3eaf0a', 800) },
    ],
  },

  cta: {
    title: 'Find out what your website is missing',
    button: { label: 'Book a free meeting', route: 'Contact', params: { topic: 'Free proposal' } },
  },
};