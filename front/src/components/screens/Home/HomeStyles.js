import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts, fontSizes, spacing, shadows, borderRadius } from './../../../styles/globalStyles';

const { width } = Dimensions.get('window');

const isSmallScreen = width < 768;    // Mobile
const isMediumScreen = width >= 768 && width < 1024;  // Tablet
const isLargeScreen = width >= 1024;  // Desktop

export default StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.white,
   
  },

  container: {
    flex: 1,
    padding: 5,
  },

  mainSection: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    gap: 20,
   
  },

  categorySection: {
    width: isLargeScreen ? '25%' : '100%',
    zIndex: 3,
  },

  sliderSection: {
    width: isLargeScreen ? '50%' : '100%',
    position: 'relative',
  },

  heroInfoSection: {
    width: isLargeScreen ? '25%' : '100%',
  },

  // Skeleton Styles
  skeletonHeroContainer: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
    marginTop: spacing[4],
  },
  skeletonHeroContainerMobile: {
    paddingHorizontal: spacing[2],
    marginBottom: spacing[4],
  },
  skeletonHeroContainerTablet: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
  },
  skeletonHeroContainerDesktop: {
    paddingHorizontal: spacing[6],
    marginBottom: spacing[8],
  },
  
  skeletonHero: {
    height: 400,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.lg,
  },

  skeletonSection: {
    marginBottom: spacing[8],
    paddingHorizontal: spacing[4],
  },
  skeletonSectionMobile: {
    marginBottom: spacing[4],
    paddingHorizontal: spacing[2],
  },
  skeletonSectionTablet: {
    marginBottom: spacing[6],
    paddingHorizontal: spacing[4],
  },
  skeletonSectionDesktop: {
    marginBottom: spacing[8],
    paddingHorizontal: spacing[6],
  },

  skeletonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[6],
  },

  skeletonTitle: {
    height: 28,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.sm,
    width: '40%',
  },

  skeletonAvatar: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },

  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  skeletonProductCard: {
    width: '48%',
    marginBottom: spacing[4],
  },

  skeletonProductImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.md,
    marginBottom: spacing[2],
  },

  skeletonProductImageLarge: {
    width: 200,
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.md,
    marginBottom: spacing[2],
  },

  skeletonProductText: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.sm,
    width: '80%',
    marginBottom: spacing[1],
  },

  skeletonProductPrice: {
    height: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.sm,
    width: '40%',
  },

  skeletonHorizontalScroll: {
    flexDirection: 'row',
  },

  skeletonHorizontalCard: {
    marginRight: spacing[4],
    width: 200,
  },

  skeletonCategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  skeletonCategoryItem: {
    alignItems: 'center',
    width: '16%',
    marginBottom: spacing[4],
  },

  skeletonCategoryCircle: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    marginBottom: spacing[2],
  },

  skeletonCategoryText: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.sm,
    width: 40,
  },

  skeletonBannerContainer: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[8],
  },
  skeletonBannerContainerMobile: {
    paddingHorizontal: spacing[2],
    marginBottom: spacing[4],
  },
  skeletonBannerContainerTablet: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[6],
  },
  skeletonBannerContainerDesktop: {
    paddingHorizontal: spacing[6],
    marginBottom: spacing[8],
  },

  skeletonBanner: {
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.lg,
  },

  skeletonFooter: {
    backgroundColor: '#f5f5f5',
    padding: spacing[8],
    marginTop: spacing[4],
  },

  skeletonFooterContent: {
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.lg,
  },
});