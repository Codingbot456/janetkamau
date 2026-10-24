// linkingConfig.js - browser URLs for each screen
export const linking = {
  prefixes: [],
  config: {
    screens: {
      Home: '',
      About: 'about',
      Services: 'services',      // /services?service=seo
      Portfolio: 'portfolio',
      Testimonials: 'testimonials',
      Blog: 'blog',
      BlogPost: 'blog/:slug',    // /blog/how-much-does-a-website-cost-in-kenya
      Contact: 'contact',
      Privacy: 'privacy-policy',
    },
  },
};