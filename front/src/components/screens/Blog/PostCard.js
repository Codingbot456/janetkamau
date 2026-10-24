import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Photo } from '../../common/ui/sections';


import { SITE } from '../../navigation/childNav/webNav/siteConfig';
import { colors, fonts, fontSizes, spacing, borderRadius } from '../../../styles/globalStyles';

// Blog card: cover photo, author row, title, short excerpt. Used on Blog, BlogPost and Home.
const PostCard = ({ post, onPress }) => (
  <Pressable onPress={onPress} accessibilityRole="link" accessibilityLabel={post.title} style={({ hovered }) => [s.card, hovered && s.cardHover]}>
    <Photo image={post.image} label={post.title} ratio={4 / 3} radius={0} />
    <View style={s.body}>
      <View style={s.author}>
        <View style={s.avatar}><Text style={s.avatarText}>DG</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={s.authorName}>{SITE.name}</Text>
          <Text style={s.meta}>{post.date} · {post.readTime}</Text>
        </View>
      </View>
      <Text style={s.category}>{post.category}</Text>
      <Text style={s.title}>{post.title}</Text>
      <Text style={s.excerpt} numberOfLines={3}>{post.excerpt}</Text>
    </View>
  </Pressable>
);

const s = StyleSheet.create({
  card: { flex: 1, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: borderRadius.md, overflow: 'hidden' },
  cardHover: { borderColor: colors.secondary },
  body: { padding: spacing[4] },
  author: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing[3] },
  avatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center', marginRight: spacing[2] },
  avatarText: { fontFamily: fonts.navBold, fontSize: 10, color: colors.white },
  authorName: { fontFamily: fonts.navMedium, fontSize: fontSizes.xs, color: colors.heading },
  meta: { fontFamily: fonts.body, fontSize: 11, color: colors.muted },
  category: { fontFamily: fonts.navSemiBold, fontSize: fontSizes.xs, color: colors.primary, marginBottom: spacing[1] },
  title: { fontFamily: fonts.heading, fontSize: 20, lineHeight: 28, color: colors.heading, marginBottom: spacing[2] },
  excerpt: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 22, color: colors.muted },
});

export default PostCard;