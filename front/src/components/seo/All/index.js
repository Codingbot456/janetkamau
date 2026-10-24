// components/SEO/index.js
import { Platform } from 'react-native';

let SEOHead;

if (Platform.OS === 'web') {
  try {
    SEOHead = require('./SEO.web').default;
  } catch (error) {
    console.error('Error loading SEO.web.js:', error.message);
    SEOHead = null;
  }
} else {
  try {
    SEOHead = require('./SEO.native').default;
  } catch (error) {
    console.error('Error loading SEO.native.js:', error.message);
    SEOHead = null;
  }
}

export default SEOHead;