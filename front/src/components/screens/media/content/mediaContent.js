const unsplash = (id, w = 1000) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80` });

// Placeholder copy. Replace the titles, outlets and links with Jackline's real press.
// `url` is an external link. Leave it '' until you have the real article, video or episode.
export const MEDIA = {
  hero: {
    titleTeal: 'USING MEDICINES SAFELY IS YOUR PRESCRIPTION FOR',
    titleDark: 'CONFIDENCE AND GOOD HEALTH.',
    lines: [
      'You will learn HOW to take medicines correctly and build habits that last.',
      'Get answers to everyday questions along with real stories that might surprise and encourage you.',
    ],
    button: { label: 'Purchase your signed copy', route: 'Shop' },
    image: unsplash('photo-1580489944761-15a19d654956'),
  },

  recommends: {
    titleA: 'WHAT ',
    highlight: 'JACKLINE',
    titleB: ' RECOMMENDS....',
    text: 'My favourite books, healthy products and wellness tools to help you look after yourself.',
    button: { label: 'Shop my recommendations', route: 'Shop' },
    image: unsplash('photo-1573496359142-b8d87734a5a2'),
  },

  press: {
    eyebrow: 'Press & Articles',
    featured: {
      source: 'The Daily Voice',
      titleTeal: '4 PHARMACISTS SHARE IDEAS FOR ',
      titlePink: 'TAKING MEDICINES SAFELY AT HOME.',
      text: 'Jackline Ndiru talks about reading labels, avoiding common mistakes and asking the right questions at the pharmacy counter.',
      link: { label: 'Learn more', url: '' },
      image: unsplash('photo-1544005313-94ddf0286df2'),
    },
    articles: [
      { id: 'a1', title: 'Health Today: Simple Habits for a Healthier Home', text: 'Interviewed by Health Today, Jackline shares year-end ways to review medicines, reset sleep and plan the new year.', link: { label: 'Read more', url: '' }, image: unsplash('photo-1494790108377-be9c29b29330', 600) },
      { id: 'a2', title: 'Wellness Weekly: Meet Jackline Ndiru, Pharmacist and Educator', text: 'Jackline discusses her journey, her work in community health and why plain language matters in healthcare.', link: { label: 'Read more', url: '' }, image: unsplash('photo-1438761681033-6461ffad8d80', 600) },
      { id: 'a3', title: 'County Health Office Honours Jackline Ndiru for Community Service', text: 'Jackline was part of a group of professionals recognised for service across health education and public safety.', link: { label: 'Watch now', url: '' }, image: unsplash('photo-1531123897727-8f129e1688ce', 600) },
    ],
  },

  podcasts: {
    items: [
      { id: 'p1', title: 'Living Well Podcast: Why Pharmacists Are Your Health Partners', text: 'Jackline and the host discuss how to build a good relationship with your pharmacist and what to ask at every visit.', link: { label: 'Listen now', url: '' }, image: unsplash('photo-1559839734-2b71ea197ec2', 600) },
      { id: 'p2', title: 'Community Radio Interview on Sleep, Stress and Medicines', text: 'In this interview, Jackline explains how stress and poor sleep affect your health and what simple steps can help.', link: { label: 'Listen now', url: '' }, image: unsplash('photo-1543269865-cbf427effbad', 600) },
    ],
  },

  video: {
    titleA: 'JACKLINE NDIRU ON THE MORNING SHOW ',
    titleB: '(NEWS 24) \u2013 TALKING ABOUT ',
    highlight: 'MEDICINE SAFETY.',
    text: 'Do you have trouble understanding the labels on your medicines? Watch Jackline\u2019s interview on how to read them and when to ask for help.',
    button: { label: 'Watch now', url: '' },
    embedUrl: '',
  },
};