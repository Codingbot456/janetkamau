const unsplash = (id, w = 1000) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80` });

// Placeholder products and prices. Replace with Jackline's real offers.
// `url` is the checkout or payment link. While it is empty, "Buy now" opens the Contact page instead.
export const SHOP = {
  hero: {
    eyebrow: 'Pharmacist & Wellness Educator',
    titleA: 'SHOP TOOLS FOR SAFER, ',
    highlight: 'HEALTHIER',
    titleB: ' LIVING & CONFIDENT DAILY CHOICES.',
    text: 'Simple, practical resources to help you understand your medicines, build better habits and look after your wellbeing, with clarity, not confusion.',
    image: unsplash('photo-1573496359142-b8d87734a5a2'),
  },

  products: [
    {
      id: 'p1', tone: 'black', title: 'SAFE MEDS ONLINE COURSE',
      sub: '(4-week course) for taking medicines correctly and with confidence.',
      strip: 'Topics: Reading labels | Storage | Side effects | Talking to your doctor',
      image: unsplash('photo-1494790108377-be9c29b29330', 600), url: '',
    },
    {
      id: 'p2', tone: 'teal', title: 'EVERYDAY WELLNESS PLANNER',
      sub: 'A simple guide to sleep, movement and meals.',
      strip: 'Weekly checklists and a medicine tracker to help your new habits stick.',
      image: unsplash('photo-1438761681033-6461ffad8d80', 600), url: '',
    },
    {
      id: 'p3', tone: 'black', title: 'HEALTH TALK WEBINAR',
      sub: 'A recorded session for your team or community group.',
      strip: 'A practical talk on medicine safety, whether you are learning or leading a group.',
      image: unsplash('photo-1540575467063-178a50c2df87', 600), url: '',
    },
  ],
  buy: 'Buy now',

  book: {
    titleTeal: 'USING MEDICINES SAFELY IS YOUR PRESCRIPTION FOR ',
    titleDark: 'CONFIDENCE AND PEACE OF MIND.',
    intro: 'Inside, you will discover:',
    bullets: [
      'How to read labels and avoid the most common medicine mistakes.',
      'Simple routines for taking medicines on time, every day.',
      'Evidence-based steps for building sleep, movement and eating habits that last.',
      'This is not just a book. It is a guide for families and professionals who want to live well.',
    ],
    button: 'Order yours today',
    url: '',
    image: unsplash('photo-1544947950-fa07a98d237f'),
  },

  faq: {
    title: 'FAQ\u2019S',
    searchPlaceholder: 'Looking for something?',
    empty: 'No questions match your search.',
    tabs: [
      {
        id: 'book', label: 'Book questions',
        items: [
          { id: 'b1', q: 'When will my book ship?', a: 'Signed copies ship within two weeks of your order. You will get a message with tracking details.' },
          { id: 'b2', q: 'Do you ship internationally?', a: 'Yes. Shipping costs and delivery times depend on your country and are shown at checkout.' },
          { id: 'b3', q: 'Can I order bulk copies for my event or organisation?', a: 'Yes. Contact us with the number of copies and your event date, and we will send a bulk price.' },
          { id: 'b4', q: 'Will a Kindle version be available?', a: 'A digital edition is planned. Join the mailing list to be told when it is ready.' },
        ],
      },
      {
        id: 'course', label: 'Course questions',
        items: [
          { id: 'c1', q: 'How do I access the online course?', a: 'After payment you receive a link and a login by email. You can start right away.' },
          { id: 'c2', q: 'How long do I have access?', a: 'You have access for 12 months, so you can learn at your own pace.' },
          { id: 'c3', q: 'Is the course medical advice?', a: 'No. The course is educational and does not replace advice from your own doctor or pharmacist.' },
        ],
      },
    ],
  },
};