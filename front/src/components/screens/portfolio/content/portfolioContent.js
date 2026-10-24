const unsplash = (id, w = 800) => ({ uri: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80` });

// PLACEHOLDER projects. Replace the titles and photos with real client work (best: a laptop or phone mockup of each site).
// Add `url: 'https://...'` to a project and its tile becomes a link that opens the live site.
export const PORTFOLIO = {
  title: 'Our portfolio',
  text: 'See below some of our work.',
  link: { label: 'Want to see your business here? Get a free proposal', route: 'Contact', params: { topic: 'Free proposal' } },

  projects: [
    { id: 'p1', category: 'Website', title: 'Lodge and tours', image: unsplash('photo-1547658719-da2b51169166'), url: '' },
    { id: 'p2', category: 'Web app', title: 'Delivery ordering', image: unsplash('photo-1551434678-e076c223a692'), url: '' },
    { id: 'p3', category: 'Website', title: 'Local clinic', image: unsplash('photo-1467232004584-a241de8bcf5d'), url: '' },
    { id: 'p4', category: 'Brand and design', title: 'Restaurant brand kit', image: unsplash('photo-1561070791-2526d30994b5'), url: '' },
    { id: 'p5', category: 'Website', title: 'Training centre', image: unsplash('photo-1498050108023-c5249f4df085'), url: '' },
    { id: 'p6', category: 'SEO', title: 'Building supplier', image: unsplash('photo-1460925895917-afdab827c52f'), url: '' },
    { id: 'p7', category: 'Website', title: 'Photography studio', image: unsplash('photo-1486312338219-ce68d2c6f44d'), url: '' },
    { id: 'p8', category: 'Mobile app', title: 'Fitness booking', image: unsplash('photo-1517694712202-14dd9538aa97'), url: '' },
    { id: 'p9', category: 'Marketing', title: 'Boutique campaign', image: unsplash('photo-1556761175-5973dc0f32e7'), url: '' },
    { id: 'p10', category: 'Website', title: 'Law firm', image: unsplash('photo-1507238691740-187a5b1d37b8'), url: '' },
    { id: 'p11', category: 'Social media', title: 'Cafe and bakery', image: unsplash('photo-1519389950473-47ba0277781c'), url: '' },
    { id: 'p12', category: 'Website', title: 'Property agency', image: unsplash('photo-1432888498266-38ffec3eaf0a'), url: '' },
  ],
};