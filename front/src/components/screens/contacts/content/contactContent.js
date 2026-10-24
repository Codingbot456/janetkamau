


import { SERVICES } from '../../../navigation/childNav/webNav/siteConfig';

// Phone, email, WhatsApp and location come from siteConfig.js, not from here.
// Placeholder copy in a friendly tone. Adjust the reply time and hours to what you really offer.
export const CONTACT = {
  title: 'Get in touch',
  paragraphs: [
    'Let\u2019s work together.',
    'What did you have in mind? Fill in the form to tell us about your project. We will get back to you within one working day to start your journey to a great new website, app or brand.',
    'Let\u2019s have a chat to see whether we are a good fit and how we can meet your needs.',
    'Let\u2019s have a free, no-obligation consultation.',
  ],
  consultation: {
    label: 'Book a free consultation',
    message: 'Hello DesignGENIUS, I would like to book a free consultation.',
  },
  details: {
    name: 'DesignGENIUS',
    hours: 'Monday to Saturday, 8:00 am to 6:00 pm (East Africa Time)',
    labels: { email: 'Email', phone: 'Telephone', whatsapp: 'WhatsApp' },
    whatsappText: 'Chat with us',
  },

  form: {
    title: 'Send a message',
    submit: 'Send your message',
    success: 'Thank you. We have your message and will reply within one working day.',
    note: 'We use your details only to reply to your message.',
    selectPlaceholder: 'Choose one',
    topics: ['Free proposal', ...SERVICES.map((s) => s.title), 'Something else'],
    hearOptions: ['Google search', 'Social media', 'A friend or colleague', 'WhatsApp', 'An article we wrote', 'Other'],
    fields: [
      { key: 'firstName', label: 'First name', required: true, half: true },
      { key: 'lastName', label: 'Last name', required: true, half: true },
      { key: 'email', label: 'Email', required: true, keyboard: 'email-address' },
      { key: 'phone', label: 'Phone or WhatsApp (optional)', keyboard: 'phone-pad' },
      { key: 'topic', label: 'What do you need?', type: 'select', optionsKey: 'topics' },
      { key: 'hear', label: 'How did you hear about us?', type: 'select', optionsKey: 'hearOptions' },
      { key: 'message', label: 'Message', required: true, multiline: true },
    ],
  },
};