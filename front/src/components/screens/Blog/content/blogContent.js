const unsplash = (id, w = 900) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80` });

// PLACEHOLDER articles in a friendly, short tone. Replace or edit them, and add your own.
// In `body`, a line starting with "## " becomes a heading; every other line is a paragraph.
// `slug` is the URL: /blog/<slug>.
export const BLOG = {
  title: 'Blog',
  text: 'Practical advice on websites, apps, SEO, marketing and design.',
  allLabel: 'All posts',
  pageSize: 8,
  empty: 'No posts in this category yet.',
  readMore: 'Read article',
  back: 'Back to blog',
  related: 'More articles',
  notFound: { title: 'We could not find that article', text: 'It may have moved. Head back to the blog to see all our posts.' },
  cta: { title: 'Want help with your own project?', text: 'Tell us what you need and we will send a free proposal.', button: { label: 'Get a free proposal', route: 'Contact', params: { topic: 'Free proposal' } } },
};

export const POSTS = [
  {
    slug: 'how-much-does-a-website-cost-in-kenya', category: 'Websites', date: 'Oct 12, 2026', readTime: '6 min read',
    title: 'How much does a website cost in Kenya?',
    excerpt: 'A clear guide to what drives the price of a website and what to ask before you buy.',
    image: unsplash('photo-1507238691740-187a5b1d37b8'),
    body: [
      'There is no single price for a website, because no two businesses need the same thing. A simple page that shows who you are costs far less than an online shop with payments. What matters is knowing what you are paying for.',
      '## What changes the price',
      'The main things are the number of pages, the amount of custom design, features such as booking or online payments, and who writes the content. The more that is built just for you, the more time it takes.',
      '## What to ask before you buy',
      'Ask what is included, who owns the site when it is finished, and what it costs to keep it running after launch. A good agency will give you a clear written price, with no hidden extras.',
      '## A simple way to start',
      'If you are unsure, start small. Launch a clean site with the pages you need now, then add features as your business grows.',
    ],
  },
  {
    slug: 'how-to-get-more-visitors-to-your-website', category: 'SEO', date: 'Oct 8, 2026', readTime: '5 min read',
    title: 'How to get more visitors to your website',
    excerpt: 'Simple SEO steps that bring in the right people, without the jargon.',
    image: unsplash('photo-1460925895917-afdab827c52f'),
    body: [
      'A good website is no use if nobody finds it. SEO, short for search engine optimisation, is the work of helping people find you on Google when they search for what you sell.',
      '## Start with what people search for',
      'Think of the words a customer would type. Use those words on your pages, in your headings and in your page titles, in a natural way.',
      '## Make your site easy to use',
      'Google prefers sites that load fast and work well on phones. Compress large images, keep pages tidy and make sure every page is easy to read on a small screen.',
      '## Keep adding useful content',
      'Answer the questions your customers ask. Each helpful page or article gives you another way to be found.',
    ],
  },
  {
    slug: 'five-signs-your-website-needs-a-redesign', category: 'Websites', date: 'Oct 3, 2026', readTime: '4 min read',
    title: 'Five signs your website needs a redesign',
    excerpt: 'If you notice these, your site may be costing you customers.',
    image: unsplash('photo-1432888498266-38ffec3eaf0a'),
    body: [
      'Websites age. Customers expect more than they did a few years ago, and an old site can quietly lose you business.',
      '## The signs',
      'It is slow to load. It is hard to use on a phone. The design looks dated. People visit but do not get in touch. Or you cannot update it yourself without help.',
      '## What to do',
      'You do not always need to start again. Sometimes a few careful changes to design, speed and content are enough. A short review will tell you which it is.',
    ],
  },
  {
    slug: 'social-media-for-small-businesses-where-to-start', category: 'Social media', date: 'Sep 28, 2026', readTime: '5 min read',
    title: 'Social media for small businesses: where to start',
    excerpt: 'Pick the right platform, post what people want and keep it going.',
    image: unsplash('photo-1556761175-5973dc0f32e7'),
    body: [
      'You do not need to be everywhere. Most small businesses do best by doing one or two platforms well.',
      '## Choose where your customers are',
      'Ask where your customers spend time. Facebook and Instagram suit many local businesses, and LinkedIn suits businesses that sell to other businesses.',
      '## Post what helps',
      'Share useful tips, behind-the-scenes photos and real customer stories. Reply to comments and messages quickly, because people notice.',
      '## Be steady',
      'A simple plan you can keep up, such as three posts a week, beats a burst of posts followed by silence.',
    ],
  },
  {
    slug: 'what-goes-into-a-good-logo', category: 'Design', date: 'Sep 22, 2026', readTime: '4 min read',
    title: 'What goes into a good logo?',
    excerpt: 'Simple, clear and easy to remember: how to judge a logo for your business.',
    image: unsplash('photo-1561070791-2526d30994b5'),
    body: [
      'A logo is a small part of your brand, but people see it everywhere. It should be easy to recognise and easy to use.',
      '## Keep it simple',
      'The best logos work in one colour, at a small size and on any background. If it only works in a large, colourful version, it will let you down.',
      '## Make it fit your business',
      'Your logo should suit your customers and your industry. A law firm and a bakery should not look the same.',
      '## Get the right files',
      'Ask for your logo in several formats, so you can use it on your website, on social media and in print.',
    ],
  },
  {
    slug: 'whatsapp-for-business-simple-ways-to-win-customers', category: 'Marketing', date: 'Sep 17, 2026', readTime: '5 min read',
    title: 'WhatsApp for business: simple ways to win customers',
    excerpt: 'Small habits that turn chats into sales.',
    image: unsplash('photo-1519389950473-47ba0277781c'),
    body: [
      'Many customers would rather send a message than make a call. A well-run WhatsApp can become one of your best sales tools.',
      '## Set it up properly',
      'Use a business profile with your name, hours and a short description. Add a catalogue if you sell products.',
      '## Reply fast and kindly',
      'Quick answers win sales. Save short replies to common questions so you can respond in seconds.',
      '## Link it to your website',
      'Add a WhatsApp button to your website and social pages, so customers can reach you in one tap.',
    ],
  },
  {
    slug: 'why-your-website-needs-regular-maintenance', category: 'Websites', date: 'Sep 12, 2026', readTime: '4 min read',
    title: 'Why your website needs regular maintenance',
    excerpt: 'A site is not finished on launch day. Here is what keeps it healthy.',
    image: unsplash('photo-1467232004584-a241de8bcf5d'),
    body: [
      'Launching your site is the start, not the end. Like a car, a website needs regular care to keep running well.',
      '## What maintenance covers',
      'Security updates, backups, speed checks and fixing broken links. It also means keeping your content fresh and correct.',
      '## What happens if you skip it',
      'Old software can become a security risk, and a slow or broken page sends customers away. Fixing problems after the fact usually costs more than preventing them.',
    ],
  },
  {
    slug: 'do-you-need-a-mobile-app-or-a-website', category: 'Apps', date: 'Sep 6, 2026', readTime: '5 min read',
    title: 'Do you need a mobile app or a website?',
    excerpt: 'How to choose the right one for your business, or when you need both.',
    image: unsplash('photo-1551434678-e076c223a692'),
    body: [
      'Both can help your business, but they do different jobs. Choosing the right one saves you time and money.',
      '## When a website is enough',
      'If you mainly want people to find you, learn about you and get in touch, a good website does the job.',
      '## When an app makes sense',
      'If customers will use your service often, such as ordering, booking or tracking, an app can make it faster and easier. Start by asking what your customers need to do again and again.',
    ],
  },
  {
    slug: 'local-seo-get-found-by-customers-near-you', category: 'SEO', date: 'Aug 30, 2026', readTime: '6 min read',
    title: 'Local SEO: get found by customers near you',
    excerpt: 'Show up when people search for what you sell in your area.',
    image: unsplash('photo-1547658719-da2b51169166'),
    body: [
      'If you serve customers in one town or area, local SEO helps you appear when they search nearby.',
      '## Claim your Google Business Profile',
      'Add your name, address, phone number, hours and photos. Keep them correct and up to date.',
      '## Ask for reviews',
      'Happy customers can help you stand out. Ask them to leave an honest review, and thank them when they do.',
      '## Mention your area',
      'Use your town or area on your website, in your titles and in your page text, in a natural way.',
    ],
  },
  {
    slug: 'a-simple-content-plan-for-your-social-media', category: 'Social media', date: 'Aug 24, 2026', readTime: '4 min read',
    title: 'A simple content plan for your social media',
    excerpt: 'Know what to post each week, without staring at a blank screen.',
    image: unsplash('photo-1486312338219-ce68d2c6f44d'),
    body: [
      'Running out of ideas is the main reason people stop posting. A simple plan fixes that.',
      '## Pick a few themes',
      'For example: tips, behind the scenes, customer stories and offers. Rotate through them each week.',
      '## Plan a month at a time',
      'Write down your posts, gather your photos and schedule them. It takes less time than doing it day by day.',
    ],
  },
  {
    slug: 'brand-colours-how-to-choose-and-use-them', category: 'Design', date: 'Aug 18, 2026', readTime: '4 min read',
    title: 'Brand colours: how to choose and use them',
    excerpt: 'A few colours, used the same way every time, make your business look professional.',
    image: unsplash('photo-1498050108023-c5249f4df085'),
    body: [
      'Colour is one of the first things people notice about a brand. A small, steady set of colours looks confident and clear.',
      '## Choose a small set',
      'Pick one main colour, one or two supporting colours and a neutral for text. More than that gets messy.',
      '## Use them the same way everywhere',
      'Keep the same colours on your website, social media, cards and signs. Note the exact codes so every designer and printer matches them.',
    ],
  },
  {
    slug: 'landing-pages-that-turn-visitors-into-leads', category: 'Marketing', date: 'Aug 10, 2026', readTime: '6 min read',
    title: 'Landing pages that turn visitors into leads',
    excerpt: 'One page, one goal: how to make visitors take action.',
    image: unsplash('photo-1517694712202-14dd9538aa97'),
    body: [
      'A landing page is a page made for one job, such as getting someone to request a quote or sign up. It works best when it has one clear goal.',
      '## Say what you offer, fast',
      'Put a clear headline and a short line at the top that tells visitors what you do and what they get.',
      '## Make the next step obvious',
      'Use one main button, such as Get a quote, and repeat it down the page. Keep forms short, because every extra field loses some people.',
      '## Build trust',
      'Add real reviews, photos of your work and your contact details, so visitors feel safe getting in touch.',
    ],
  },
];

export const CATEGORIES = [...new Set(POSTS.map((p) => p.category))];
export const findPost = (slug) => POSTS.find((p) => p.slug === slug);
export const relatedPosts = (post, n = 3) => {
  const same = POSTS.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...rest].slice(0, n);
};