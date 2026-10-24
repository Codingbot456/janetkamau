import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { useSafeNav } from '../../navigation/childNav/webNav/useSafeNav';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout, borderRadius } from '../../../styles/globalStyles';
import PostCard from './PostCard';
import { BLOG, POSTS, CATEGORIES } from './content/blogContent';

// Plain page, like the model: solid blue header, category tabs, grid of post cards, page numbers.
const BlogScreen = () => {
  const go = useSafeNav();
  const { width } = useWindowDimensions();
  const phone = width < layout.tablet;
  const tablet = width < layout.desktop;
  const [cat, setCat] = useState(BLOG.allLabel);
  const [page, setPage] = useState(1);

  const tabs = [BLOG.allLabel, ...CATEGORIES];
  const filtered = cat === BLOG.allLabel ? POSTS : POSTS.filter((p) => p.category === cat);
  const pages = Math.max(1, Math.ceil(filtered.length / BLOG.pageSize));
  const shown = filtered.slice((page - 1) * BLOG.pageSize, page * BLOG.pageSize);
  const cardW = phone ? '100%' : tablet ? '50%' : '25%'; // 4 per row on desktop, 2 on tablets, 1 on phones

  const pickCat = (c) => { setCat(c); setPage(1); };

  return (
    <PageLayout headerColor={colors.secondary}>
      <View style={s.head}>
        <Text style={[s.title, phone && { fontSize: 40, lineHeight: 50 }]} accessibilityRole="header">{BLOG.title}</Text>
        <Text style={s.sub}>{BLOG.text}</Text>
      </View>

      {/* Category tabs */}
      <View style={s.tabsWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.tabs}>
          {tabs.map((c) => {
            const on = c === cat;
            return (
              <Pressable key={c} onPress={() => pickCat(c)} accessibilityRole="tab" accessibilityState={{ selected: on }} style={[s.tab, on && s.tabOn]}>
                <Text style={[s.tabText, on && s.tabTextOn]}>{c}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Posts */}
      <View style={[g.container, { paddingTop: spacing[8], paddingBottom: spacing[12] }]}>
        {shown.length === 0 ? <Text style={[g.textMuted, { paddingVertical: spacing[8] }]}>{BLOG.empty}</Text> : null}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 }}>
          {shown.map((p) => (
            <View key={p.slug} style={{ width: cardW, padding: 8 }}>
              <PostCard post={p} onPress={() => go('BlogPost', { slug: p.slug })} />
            </View>
          ))}
        </View>

        {/* Page numbers */}
        {pages > 1 ? (
          <View style={s.pager} accessibilityRole="navigation">
            <Pressable disabled={page === 1} onPress={() => setPage(page - 1)} accessibilityLabel="Previous page" style={[s.pageBtn, page === 1 && { opacity: 0.35 }]}>
              <Icon name="chevron-left" size={22} color={colors.heading} />
            </Pressable>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Pressable key={n} onPress={() => setPage(n)} accessibilityLabel={`Page ${n}`} accessibilityState={{ selected: n === page }} style={[s.pageBtn, n === page && s.pageOn]}>
                <Text style={[s.pageText, n === page && { color: colors.onPrimary }]}>{n}</Text>
              </Pressable>
            ))}
            <Pressable disabled={page === pages} onPress={() => setPage(page + 1)} accessibilityLabel="Next page" style={[s.pageBtn, page === pages && { opacity: 0.35 }]}>
              <Icon name="chevron-right" size={22} color={colors.heading} />
            </Pressable>
          </View>
        ) : null}
      </View>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  head: { alignItems: 'center', paddingHorizontal: spacing[6], paddingTop: spacing[16], paddingBottom: spacing[8] },
  title: { fontFamily: fonts.heading, fontSize: 56, lineHeight: 68, color: colors.heading, textAlign: 'center' },
  sub: { fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.ink, textAlign: 'center', marginTop: spacing[3], maxWidth: 560 },

  tabsWrap: { borderBottomWidth: 1, borderBottomColor: colors.line },
  tabs: { paddingHorizontal: spacing[6], alignSelf: 'center' },
  tab: { paddingVertical: 14, paddingHorizontal: spacing[4], borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabOn: { borderBottomColor: colors.primary },
  tabText: { fontFamily: fonts.navMedium, fontSize: fontSizes.sm, color: colors.muted },
  tabTextOn: { color: colors.heading },

  pager: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: spacing[10] },
  pageBtn: { minWidth: 38, height: 38, borderRadius: borderRadius.full, alignItems: 'center', justifyContent: 'center', marginHorizontal: 3 },
  pageOn: { backgroundColor: colors.primary },
  pageText: { fontFamily: fonts.navMedium, fontSize: fontSizes.sm, color: colors.heading },
});

export default BlogScreen;