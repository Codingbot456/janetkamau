import React from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { useSafeNav } from '../../navigation/childNav/webNav/useSafeNav';
import { Photo, PillButton } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout } from '../../../styles/globalStyles';
import { SITE } from '../../navigation/childNav/webNav/siteConfig';
import PostCard from './PostCard';
import { BLOG, findPost, relatedPosts } from './content/blogContent';

// One article, found by the `slug` in the route: /blog/<slug>
const BlogPostScreen = () => {
  const go = useSafeNav();
  const route = useRoute();
  const slug = route && route.params && route.params.slug;
  const post = findPost(slug);
  const { width } = useWindowDimensions();
  const phone = width < layout.tablet;
  const tablet = width < layout.desktop;

  const back = (
    <Pressable onPress={() => go('Blog')} accessibilityRole="link" style={s.back}>
      <Icon name="arrow-back" size={18} color={colors.heading} />
      <Text style={s.backText}>{BLOG.back}</Text>
    </Pressable>
  );

  if (!post) {
    return (
      <PageLayout headerColor={colors.secondary}>
        <View style={s.notFound}>
          <Text style={s.nfTitle}>{BLOG.notFound.title}</Text>
          <Text style={[g.text, g.textCenter, { marginVertical: spacing[4] }]}>{BLOG.notFound.text}</Text>
          <PillButton label={BLOG.back} icon="arrow-back" onPress={() => go('Blog')} />
        </View>
      </PageLayout>
    );
  }

  const related = relatedPosts(post, 3);
  const h1 = phone ? { fontSize: 34, lineHeight: 44 } : { fontSize: 48, lineHeight: 60 };

  return (
    <PageLayout headerColor={colors.secondary}>
      <View style={[g.container, { paddingTop: spacing[10], paddingBottom: spacing[12] }]}>
        <View style={s.article}>
          {back}
          <Text style={s.category}>{post.category}</Text>
          <Text style={[s.title, h1]} accessibilityRole="header">{post.title}</Text>
          <Text style={s.meta}>{SITE.name} · {post.date} · {post.readTime}</Text>

          <View style={{ marginVertical: spacing[8] }}>
            <Photo image={post.image} label={post.title} ratio={16 / 9} />
          </View>

          {post.body.map((line, i) =>
            line.startsWith('## ')
              ? <Text key={i} style={s.h2} accessibilityRole="header">{line.slice(3)}</Text>
              : <Text key={i} style={s.p}>{line}</Text>
          )}

          <View style={s.help}>
            <Text style={s.helpTitle}>{BLOG.cta.title}</Text>
            <Text style={s.helpText}>{BLOG.cta.text}</Text>
            <PillButton label={BLOG.cta.button.label} onPress={() => go(BLOG.cta.button.route, BLOG.cta.button.params)} />
          </View>
        </View>
      </View>

      {/* More articles */}
      <View style={s.relatedWrap}>
        <View style={g.container}>
          <Text style={s.relatedTitle}>{BLOG.related}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 }}>
            {related.map((p) => (
              <View key={p.slug} style={{ width: phone ? '100%' : tablet ? '50%' : '33.333%', padding: 8 }}>
                <PostCard post={p} onPress={() => go('BlogPost', { slug: p.slug })} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  article: { width: '100%', maxWidth: 820, alignSelf: 'center' },
  back: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: spacing[6] },
  backText: { fontFamily: fonts.navMedium, fontSize: fontSizes.sm, color: colors.heading, marginLeft: spacing[2], textDecorationLine: 'underline' },
  category: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.sm, color: colors.primary, marginBottom: spacing[2] },
  title: { fontFamily: fonts.headingBold, color: colors.heading },
  meta: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.muted, marginTop: spacing[3] },
  h2: { fontFamily: fonts.heading, fontSize: 28, lineHeight: 38, color: colors.heading, marginTop: spacing[6], marginBottom: spacing[3] },
  p: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 29, color: colors.ink, marginBottom: spacing[4] },
  help: { backgroundColor: colors.sky, borderWidth: 1, borderColor: colors.skyLine, borderRadius: 14, padding: spacing[8], marginTop: spacing[10] },
  helpTitle: { fontFamily: fonts.heading, fontSize: 26, lineHeight: 34, color: colors.heading },
  helpText: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 26, color: colors.ink, marginVertical: spacing[3], marginBottom: spacing[5] },

  relatedWrap: { backgroundColor: colors.bar, paddingVertical: spacing[12] },
  relatedTitle: { fontFamily: fonts.heading, fontSize: 32, color: colors.heading, marginBottom: spacing[6] },

  notFound: { alignItems: 'center', paddingVertical: spacing[20], paddingHorizontal: spacing[6] },
  nfTitle: { fontFamily: fonts.heading, fontSize: 36, lineHeight: 46, color: colors.heading, textAlign: 'center' },
});

export default BlogPostScreen;