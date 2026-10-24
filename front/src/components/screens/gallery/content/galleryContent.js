// galleryContent.js - Uses reliable local image imports with verified official social post URLs

export const GALLERY_PAGE = {
  label: 'Gallery',
  title: 'Social Media & Community Gallery',
  filterLabel: 'Filter By Category:',
  allLabel: 'All Updates',
};

export const GALLERY_CATEGORIES = ['Events', 'Community', 'Projects', 'Fellowship'];

export const GALLERY_PHOTOS = [
  {
    id: 'g1',
    category: 'Community',
    caption: 'Today, we celebrate the teachers of Kajiado North for their dedication, sacrifice, and unwavering commitment to shaping the future of our children.',
    image: require('../../../../assets/images/gallery/youth2.jpg'),
    postUrl: 'https://www.facebook.com/DanielKimariMP/posts/1093716509720392/',
  },
  {
    id: 'g2',
    category: 'Fellowship',
    caption: 'Honoured to fellowship with the congregation at Harvest Family Church, giving thanks to God for His faithfulness, grace, and goodness.',
    image: require('../../../../assets/images/gallery/fellowship.jpg'),
    postUrl: 'https://www.facebook.com/DanielKimariMP/posts/1093024389789604/',
  },
  {
    id: 'g3',
    category: 'Community',
    caption: '#MazingiraDay tree planting initiative and environmental conservation drive across Kajiado North school grounds.',
    image: require('../../../../assets/images/gallery/teachers.jpg'),
    postUrl: 'https://www.facebook.com/DanielKimariMP/',
  },
  {
    id: 'g4',
    category: 'Events',
    caption: 'Consultative town hall meeting with local market traders, small business owners, and local enterprise leaders.',
    image: require('../../../../assets/images/gallery/youth.jpg'),
    postUrl: 'https://www.facebook.com/DanielKimariMP/',
  },
 {
    id: 'g5',
    category: 'Projects',
    caption: 'Commissioning solar-powered clean water borehole expansion networks and community piping.',
    image: require('../../../../assets/images/gallery/borehole.jpg'),
    postUrl: 'https://www.facebook.com/photo.php?fbid=1083602067398503&set=pb.100072461585675.-2207520000&type=3',
  },
  {
    id: 'g6',
    category: 'Projects',
    caption: '#DanFiber free public Wi-Fi digital connectivity hub setup near community youth study centers.',
    image: require('../../../../assets/images/gallery/community.jpg'),
    postUrl: 'https://www.facebook.com/DanielKimariMP/',
  },
];