const unsplash = (id, w = 1000) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80` });

// Placeholder copy adapted to Jackline's brand. Replace names, numbers and quotes with real ones.
export const SPEAKING = {
  topBar: { label: 'Book to speak', route: 'Contact' },

  hero: {
    eyebrow: 'Speaking',
    title: 'Equipping leaders and communities through talks and workshops.',
    text: 'Workplace expert and speaker Jackline Ndiru turns medicine safety and everyday wellbeing into talks people remember and use. Trusted by companies, clinics and community groups across Kenya.',
    primary: { label: 'Plan my event', anchor: 'book' },
    secondary: { label: 'View topics', anchor: 'topics' },
    image: unsplash('photo-1580489944761-15a19d654956'),
  },

  trusted: {
    label: 'Most trusted engagements',
    logos: ['HEALTHWAY', 'Mercy Clinic', 'UNITED CARE', 'Northgate', 'WELLNEST', 'Riverside'],
  },

  intro: {
    video: { url: '' },
    paragraphs: [
      'With a track record of speaking at companies, universities and conferences, Jackline Ndiru delivers sessions that engage audiences and translate into real habits.',
      'A pharmacist by training and an award-winning educator by calling, she has addressed audiences at health fairs, corporate events and community gatherings.',
    ],
    button: { label: 'Download speaker sheet', route: 'Media' },
  },

  unique: {
    eyebrow: 'What Makes Me Unique',
    title: 'A speaker built for stages where credibility matters.',
    note: 'Signature keynote topics',
    items: [
      { id: 'u1', title: 'Clinically trusted', text: 'Practical, safe advice from a registered pharmacist with years of patient-facing experience.' },
      { id: 'u2', title: 'Trusted by organisations', text: 'Companies, clinics and women\u2019s networks invite her back year after year.' },
      { id: 'u3', title: 'Published author', text: 'Author of a friendly guide to using medicines safely and living well.' },
      { id: 'u4', title: 'Customised for you', text: 'Every talk is shaped around your audience, your goals and your time slot.' },
    ],
    button: { label: 'Book your event now', route: 'Contact' },
  },

  topics: {
    eyebrow: 'Most Popular Talks',
    title: 'Most requested keynotes, customised for your audience.',
    button: { label: 'Book your event now', route: 'Contact' },
    items: [
      { id: 't1', title: 'Medicine Safety at Home', text: 'How to read labels, store medicines and avoid common mistakes. Ideal for families, churches and seniors\u2019 groups.' },
      { id: 't2', title: 'Sleep, Stress and Energy', text: 'Simple routines that help busy teams rest better and work well, without burning out.' },
      { id: 't3', title: 'Healthy Habits That Last', text: 'Small steps in eating, movement and check-ins that fit real life and stay long after the event.' },
      { id: 't4', title: 'Talking to Your Pharmacist', text: 'What to ask, what to share and how to get the most from every pharmacy visit.' },
    ],
  },

  framework: {
    eyebrow: 'The Framework',
    title: 'Everything you need to deliver a great event.',
    text: 'Built for event planners, HR teams, universities and community organisers who want a smooth, well-prepared speaker.',
    steps: [
      { id: 'f1', text: 'Share your event, audience and goals so she can recommend the right format.' },
      { id: 'f2', text: 'Receive a pre-event call, a tailored outline and all the materials you need.' },
      { id: 'f3', text: 'Audience handouts and follow-up resources can be added to extend the impact.' },
    ],
  },

  reviews: {
    eyebrow: 'Reviews From The Room',
    title: 'Raving client reviews',
    items: [
      { id: 'r1', text: 'Jackline explained medicines so clearly that our members were taking notes. Many asked for a follow-up session.', name: 'Event Organiser', role: 'Community health group' },
      { id: 'r2', text: 'Our team left with simple tools they could use that week. The sleep session was a favourite.', name: 'HR Manager', role: 'Corporate client' },
      { id: 'r3', text: 'Warm, clear and professional. She connected with every age in the room.', name: 'Association Chair', role: 'Women in business network' },
    ],
    photos: [
      { id: 'p1', image: unsplash('photo-1540575467063-178a50c2df87'), label: 'Talk at a county health fair' },
      { id: 'p2', image: unsplash('photo-1522202176988-66273c2fd55f'), label: 'Team workshop' },
      { id: 'p3', image: unsplash('photo-1543269865-cbf427effbad'), label: 'Wellness morning for mothers' },
    ],
  },

  downloads: {
    eyebrow: 'For Planners & Media',
    title: 'Download what you need to make the case internally.',
    items: [
      { id: 'd1', eyebrow: 'Overview', title: 'Speaker one sheet', text: 'Bio, topics and contact details in one page.', link: { label: 'Get the PDF', route: 'Media' } },
      { id: 'd2', eyebrow: 'Intro', title: 'Stage intro', text: 'A short introduction for the host to read on the day.', link: { label: 'Get the PDF', route: 'Media' } },
      { id: 'd3', eyebrow: 'Procurement', title: 'Capability statement', text: 'For procurement teams and vendor lists.', link: { label: 'Get the PDF', route: 'Media' } },
    ],
  },

  rider: {
    eyebrow: 'AV & Setup',
    title: 'Tech rider for on-site presentations.',
    items: [
      'Projector or screen with HDMI connection',
      'Clip-on or handheld microphone',
      'Clicker and a small table for notes',
      'Permission requested for photo and video',
      'Arrival 45 minutes before start time',
      'Audience handouts printed by the organiser',
    ],
  },

  quotes: [
    { id: 'q1', text: 'Jackline Ndiru is a powerful, trusted voice. Her talk left our members informed and encouraged.', name: 'Event Organiser' },
    { id: 'q2', text: 'Booking Jackline was easy, and she shaped the session around our audience from the first call.', name: 'Programme Lead' },
    { id: 'q3', text: 'Practical and warm. People are still using her tips weeks after the event.', name: 'Association Chair' },
  ],

  partner: {
    title: 'Let\u2019s partner for your event or workshop today.',
    text: 'Submit your event date, audience and outcomes. Our team responds within two business days.',
    button: { label: 'Book Jackline to speak', route: 'Contact' },
  },

  banner: {
    text: 'With years of experience speaking at companies, clinics and community events, Jackline will help your audience understand, act and stay well.',
    button: { label: 'Book your event', route: 'Contact' },
    image: unsplash('photo-1540575467063-178a50c2df87', 1600),
  },

  clients: {
    label: 'Clients & Features',
    logos: ['HEALTHWAY', 'The Daily Voice', 'UNITED CARE', 'HEALTH TODAY', 'Wellness Weekly', 'NEWS 24'],
  },

  moments: {
    title: 'Speaking moments',
    photos: [
      { id: 'm1', image: unsplash('photo-1540575467063-178a50c2df87'), label: 'Health fair talk' },
      { id: 'm2', image: unsplash('photo-1522202176988-66273c2fd55f'), label: 'Corporate workshop' },
      { id: 'm3', image: unsplash('photo-1543269865-cbf427effbad'), label: 'Wellness morning' },
      { id: 'm4', image: unsplash('photo-1580489944761-15a19d654956'), label: 'Keynote' },
      { id: 'm5', image: unsplash('photo-1559839734-2b71ea197ec2'), label: 'Pharmacist consultation' },
    ],
  },

  pull: {
    label: 'This is your idea',
    text: 'Jackline helped me declutter confusing health advice, and I became comfortable asking the questions I had avoided for years.',
  },

  headshots: {
    title: 'Approved headshots',
    note: 'Click the image to download',
    photos: [
      { id: 'h1', image: unsplash('photo-1573496359142-b8d87734a5a2', 600) },
      { id: 'h2', image: unsplash('photo-1494790108377-be9c29b29330', 600) },
      { id: 'h3', image: unsplash('photo-1438761681033-6461ffad8d80', 600) },
      { id: 'h4', image: unsplash('photo-1531123897727-8f129e1688ce', 600) },
      { id: 'h5', image: unsplash('photo-1544005313-94ddf0286df2', 600) },
    ],
  },

  form: {
    title: 'Book Jackline for your event',
    submit: 'Submit',
    success: 'Thank you. Your request has been received and Jackline\u2019s team will reply within two business days.',
    // half = sits beside the previous half field on wide screens
    fields: [
      { key: 'firstName', label: 'First name', required: true, half: true },
      { key: 'lastName', label: 'Last name', required: true, half: true },
      { key: 'phone', label: 'Phone', keyboard: 'phone-pad' },
      { key: 'email', label: 'Email', required: true, keyboard: 'email-address' },
      { key: 'date', label: 'Preferred event date', hint: 'Please provide a variety of availability' },
      { key: 'topic', label: 'Theme or desired topic' },
      { key: 'times', label: 'Event start and end time' },
      { key: 'audience', label: 'Who is the audience, and what should they take away?', multiline: true },
      { key: 'size', label: 'How many people will attend?', keyboard: 'numeric' },
      { key: 'org', label: 'What type of event is it? (workshop, conference, panel...)' },
      { key: 'location', label: 'Event location (city and venue)' },
      { key: 'budget', label: 'Estimated speaker budget' },
      { key: 'message', label: 'Tell us more about your event', multiline: true },
    ],
  },
};