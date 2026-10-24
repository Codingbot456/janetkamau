import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout, borderRadius } from '../../../styles/globalStyles';
import { TESTIMONIALS } from './content/testimonialsContent';

// One review card. Long reviews are cut to four lines with a "Show more" link, like the model.
const Card = ({ item }) => {
  const [open, setOpen] = useState(false);
  const long = item.text.length > TESTIMONIALS.collapseAfter;
  return (
    <View style={s.card}>
      <Text style={s.name}>{item.name}</Text>
      <Text style={s.text} numberOfLines={open || !long ? undefined : 4}>{item.text}</Text>
      {long ? (
        <Pressable onPress={() => setOpen((o) => !o)} accessibilityRole="button" accessibilityState={{ expanded: open }} style={{ alignSelf: 'flex-start' }}>
          <Text style={s.more}>{open ? TESTIMONIALS.showLess : TESTIMONIALS.showMore}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

// Plain page, like the model: solid blue header, centred title, grid of review cards.
const TestimonialsScreen = () => {
  const { width } = useWindowDimensions();
  const phone = width < layout.tablet;
  const tablet = width < layout.desktop;
  const { title, text, items } = TESTIMONIALS;

  const h1 = phone ? { fontSize: 40, lineHeight: 50 } : { fontSize: 56, lineHeight: 68 };
  const cardW = phone ? '100%' : tablet ? '50%' : '25%'; // 4 per row on desktop, 2 on tablets, 1 on phones

  return (
    <PageLayout headerColor={colors.secondary}>
      <View style={s.head}>
        <Text style={[s.title, h1]} accessibilityRole="header">{title}</Text>
        <Text style={s.sub}>{text}</Text>
      </View>

      <View style={[g.container, { paddingBottom: spacing[16] }]}>
        {/* alignItems flex-start so opening one card does not stretch its neighbours; last row stays centred */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start', marginHorizontal: -8 }}>
          {items.map((t) => (
            <View key={t.id} style={{ width: cardW, padding: 8 }}>
              <Card item={t} />
            </View>
          ))}
        </View>
      </View>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  head: { alignItems: 'center', paddingHorizontal: spacing[6], paddingTop: spacing[16], paddingBottom: spacing[10] },
  title: { fontFamily: fonts.heading, color: colors.heading, textAlign: 'center' },
  sub: { fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.ink, textAlign: 'center', marginTop: spacing[3] },

  card: { backgroundColor: colors.bar, borderRadius: borderRadius.lg, padding: spacing[8] },
  name: { fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.heading, marginBottom: spacing[6] },
  text: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 29, color: colors.ink, marginBottom: spacing[3] },
  more: { fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.heading, textDecorationLine: 'underline' },
});

export default TestimonialsScreen;