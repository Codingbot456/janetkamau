const unsplash = (id, w = 1000) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80` });

// Placeholder copy adapted to Jackline's brand. Replace with her real offers, prices and stories.
export const WORK = {
  hero: {
    eyebrow: 'Welcome to your coaching experience',
    title: 'You have taken care of everyone else. Now it is time to take care of you.',
    text: 'You are busy, capable and dependable, and your health has quietly moved down the list. This programme helps you understand your body, your medicines and your habits, so you can feel well again.',
    button: { label: 'Explore coaching now', anchor: 'packages' },
    image: unsplash('photo-1573496359142-b8d87734a5a2'),
  },

  past: {
    label: 'Past stages and engagements',
    logos: ['HEALTHWAY', 'Mercy Clinic', 'UNITED CARE', 'Northgate', 'WELLNEST', 'Riverside'],
  },

  statement: {
    text: 'You can be grateful for what you have built and still want something different. You want better sleep, steady energy and clear answers about your health, without another confusing leaflet.',
    closing: 'That is where our work begins.',
  },

  who: {
    eyebrow: 'Who I work with',
    title: 'You may recognise yourself here',
    paragraphs: [
      'You are established in your career, family and community. But lately you have been thinking about your health in a new way: tired more often, taking medicines you do not fully understand, or unsure which advice to trust.',
      'You may be managing a long-term condition, caring for a parent, or simply ready to build routines that last. This work meets you where you are.',
    ],
  },

  sound: {
    eyebrow: 'Does this sound like you?',
    title: 'If this sounds familiar, you are in the right place.',
    text: 'These are not signs that you have failed. They are signs that your current way of looking after your health needs attention.',
    cards: [
      { id: 'c1', title: 'Exhausted from work and home', text: 'Low energy and poor sleep, but you are meeting the demands of everyone around you.' },
      { id: 'c2', title: 'Second-guessing every decision', text: 'It takes days to decide on food, medicine or exercise because you cannot tell what is safe.' },
      { id: 'c3', title: 'Stuck in a season of transition', text: 'Your mind will not stop. You manage everyone around you, but not yourself.' },
    ],
  },

  deeper: {
    eyebrow: 'Let\u2019s dig deeper',
    title: 'Your upgraded lifestyle goes beyond a prescription or a leaflet.',
    paragraphs: [
      'Over 12 weeks, we will work together to review your medicines, routines and goals, and create a path toward feeling well.',
      'Our conversations cover your medicines, sleep, food, stress and the people who support you.',
    ],
    note: 'Because sometimes the decision that feels good is not the one that keeps you well.',
    button: { label: 'Explore coaching now', anchor: 'packages' },
    cards: [
      { id: 'd1', title: 'Understanding', items: ['Know what each medicine does and why', 'Clear up confusion with simple explanations', 'Build a medicine routine that is easy to follow'] },
      { id: 'd2', title: 'Habits', items: ['Set up sleep and movement you can keep', 'Plan meals that fit your day', 'Make small changes that stick'] },
      { id: 'd3', title: 'Support', items: ['Talk with your doctor with confidence', 'Involve family in a helpful way', 'Protect your time for rest and recovery'] },
      { id: 'd4', title: 'Progress', items: ['Check in every two weeks', 'Adjust the plan as life changes', 'Celebrate what is working'] },
    ],
  },

  packages: {
    eyebrow: 'Three ways to work together',
    title: 'Choose the service that is right for you.',
    items: [
      {
        id: 'k1', name: 'Health Reset Day',
        best: 'Best for people who want clarity quickly and a focused plan to start with.',
        included: ['Pre-day health questionnaire', '4-hour one-to-one session', 'Personalised medicine review', 'Written action plan', '14-day follow-up call'],
      },
      {
        id: 'k2', name: '12-Week Coaching',
        best: 'Best for people who want steady guidance and accountability to build new habits.',
        included: ['Twelve 60-minute sessions', 'Medicine and habit tracking tools', 'Access by message between sessions', 'Personalised wellness plan', 'Community support circle'],
      },
      {
        id: 'k3', name: 'Team Wellness Programme',
        best: 'Best for companies and groups that want healthier, more resilient teams.',
        included: ['Six sessions over six weeks', 'Stress and sleep workshops', 'Medicine safety talk', 'Team handouts and checklists', 'Progress report for HR'],
      },
    ],
    button: { label: 'Inquire', route: 'Contact' },
  },

  book: {
    eyebrow: 'Now available',
    title: 'Using Medicines Safely, the book.',
    text: 'A friendly guide to taking medicines correctly and building habits that last, with simple checklists and real stories.',
    button: { label: 'Order a signed copy', route: 'Shop' },
    image: unsplash('photo-1544947950-fa07a98d237f'),
  },

  achieve: {
    eyebrow: 'What we can achieve',
    title: 'Create a life that feels as good as it looks, privately and publicly.',
    items: [
      { id: 'a1', title: 'Clarity', text: 'Get clear on what your medicines do, what your body needs and which next steps matter most.' },
      { id: 'a2', title: 'Capacity', text: 'Strengthen your energy and boundaries so you can care for others without running on empty.' },
      { id: 'a3', title: 'Strategy', text: 'Move beyond guesswork with a personalised plan you can follow and adjust.' },
    ],
    image: unsplash('photo-1522202176988-66273c2fd55f'),
  },

  why: {
    eyebrow: 'Why Jackline and why this work',
    title: 'I understand what it means to move beyond advice and into action.',
    paragraphs: [
      'For more than a decade, I have worked as a pharmacist, speaker and health educator. I have sat with many busy people who knew what to do but not how.',
      'That is why my coaching is practical. We do not just talk about health. We build the routines, questions and support that make it real.',
      'I bring these experiences into our work together, not to hand you a generic formula, but to support you with plain words and honest advice.',
    ],
    image: unsplash('photo-1559839734-2b71ea197ec2'),
  },

  reasons: {
    eyebrow: 'Need another reason to invest?',
    title: 'Why people choose to work with Jackline.',
    items: [
      { id: 'r1', title: 'Clinical guidance', text: 'You get advice from a registered pharmacist who explains the reasons behind it.' },
      { id: 'r2', title: 'Personalised support', text: 'Your plan is shaped around your life, your medicines and your goals.' },
      { id: 'r3', title: 'Real-world experience', text: 'Years of work in pharmacies, clinics and community talks shape every session.' },
      { id: 'r4', title: 'Whole-person approach', text: 'We look at sleep, food, stress and relationships, not just a single symptom.' },
    ],
  },

  results: {
    eyebrow: 'Coaching client results',
    items: [
      { id: 'v1', caption: 'A client conversation about clarity, growth and creating a life that feels aligned.', name: 'Client name', role: 'Coaching client', videoUrl: '' },
      { id: 'v2', caption: 'A client conversation about steady energy, safer routines and feeling in control.', name: 'Client name', role: 'Coaching client', videoUrl: '' },
    ],
  },

  faq: {
    title: 'Before you take your next step.',
    items: [
      { id: 'f1', q: 'Who benefits from your coaching services?', a: 'Our services are designed for busy professionals, caregivers, entrepreneurs and anyone who wants clear, safe guidance on everyday health.' },
      { id: 'f2', q: 'What is the investment range for your services?', a: 'Pricing depends on the service you choose. Book a free chat and Jackline will recommend the right option and share the fees.' },
      { id: 'f3', q: 'Can my employer or organisation sponsor my experience?', a: 'Yes. Many clients are sponsored by their workplace. We can provide an invoice and a programme summary.' },
      { id: 'f4', q: 'Can I book a call before making an investment?', a: 'Yes. A free 20-minute chat is available so you can ask questions before deciding.' },
      { id: 'f5', q: 'How soon can I expect to see results?', a: 'Most clients notice small changes within the first few weeks, such as better routines and more confidence with their medicines.' },
      { id: 'f6', q: 'Do you work with clients outside of Kenya?', a: 'Yes. Sessions are held online, so you can join from anywhere. Note that medicine advice follows the rules of your own country.' },
      { id: 'f7', q: 'Do you accept insurance as a form of payment?', a: 'Coaching is not covered by insurance. We can provide a receipt in case your provider offers wellness reimbursements.' },
    ],
  },

  final: {
    title: 'You do not have to have your entire next chapter figured out.',
    text: 'If you are ready to shift into what your soul desires, I invite you to apply for coaching.',
    primary: { label: 'Book Jackline to speak', route: 'Speaking' },
    secondary: { label: 'Schedule a discovery call', route: 'Contact' },
  },
};