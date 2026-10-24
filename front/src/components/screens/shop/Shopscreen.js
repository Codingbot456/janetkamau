import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Linking, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { Button, useSafeNavigate } from '../../common/ui/ui';
import { Photo, Band } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, spacing, layout, placeholderTextColor } from '../../../styles/globalStyles';
import { SHOP } from './content/shopContent';

const ProductCard = ({ p, phone, onBuy, buyLabel }) => {
  const dark = p.tone === 'black';
  const bg = dark ? colors.black : colors.teal;
  return (
    <View style={{ flex: 1 }}>
      <View style={[s.cardTop, { backgroundColor: bg }]}>
        <View style={s.corner}><Icon name="school" size={30} color={colors.black} /></View>
        <View style={{ flex: 1, justifyContent: 'center', padding: spacing[6], paddingTop: spacing[16] }}>
          <Text style={[s.cardTitle, phone && { fontSize: 20, lineHeight: 28 }]}>{p.title}</Text>
          <Text style={s.cardSub}>{p.sub}</Text>
        </View>
        <View style={{ width: '42%', justifyContent: 'flex-end' }}>
          <Photo image={p.image} label={p.title} ratio={3 / 4} radius={0} />
        </View>
      </View>
      <View style={s.strip}>
        <Icon name="chat-bubble" size={34} color={colors.black} style={{ marginRight: spacing[4] }} />
        <Text style={s.stripText}>{p.strip}</Text>
      </View>
      <View style={{ marginTop: spacing[5], alignSelf: 'center', width: '60%', minWidth: 180 }}>
        <Button label={buyLabel} onPress={onBuy} />
      </View>
    </View>
  );
};

const FaqItem = ({ item, open, onToggle }) => (
  <View style={s.faqItem}>
    <Pressable onPress={onToggle} accessibilityRole="button" accessibilityState={{ expanded: open }} style={s.faqHead}>
      <Text style={s.faqQ}>{item.q}</Text>
      <Icon name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={26} color={colors.ink} />
    </Pressable>
    {open ? <Text style={s.faqA}>{item.a}</Text> : null}
  </View>
);

const ShopScreen = () => {
  const go = useSafeNavigate();
  const { width } = useWindowDimensions();
  const compact = width < layout.desktop;
  const phone = width < layout.tablet;
  const { hero, products, buy, book, faq } = SHOP;

  const [tab, setTab] = useState(faq.tabs[0].id);
  const [openId, setOpenId] = useState(faq.tabs[0].items[0].id);
  const [search, setSearch] = useState('');

  const h1 = phone ? { fontSize: 28, lineHeight: 40 } : compact ? { fontSize: 38, lineHeight: 52 } : { fontSize: 44, lineHeight: 60 };
  const h2 = phone ? { fontSize: 26, lineHeight: 38 } : compact ? { fontSize: 32, lineHeight: 46 } : { fontSize: 38, lineHeight: 54 };
  const body = { fontSize: phone ? 15 : 16, lineHeight: phone ? 24 : 26 };

  // Opens the checkout link, or the Contact page while no link is set
  const buyNow = (url) => (url ? Linking.openURL(url) : go('Contact'));

  const term = search.trim().toLowerCase();
  const activeTab = faq.tabs.find((t) => t.id === tab) || faq.tabs[0];
  // While searching, look through every tab
  const pool = term ? faq.tabs.flatMap((t) => t.items) : activeTab.items;
  const shown = term ? pool.filter((i) => (i.q + ' ' + i.a).toLowerCase().includes(term)) : pool;

  return (
    <PageLayout>
      {/* Hero (teal) */}
      <Band bg={colors.teal} pad={spacing[12]}>
        <View style={{ flexDirection: compact ? 'column-reverse' : 'row', alignItems: 'center' }}>
          <View style={{ flex: compact ? undefined : 1, width: compact ? '100%' : undefined, alignItems: 'center', marginTop: compact ? spacing[8] : 0 }}>
            <View style={{ width: '100%', maxWidth: 420 }}><Photo image={hero.image} label="Jackline Ndiru" ratio={4 / 5} radius={0} /></View>
          </View>
          <View style={{ flex: compact ? undefined : 1, paddingLeft: compact ? 0 : spacing[10] }}>
            <Text style={s.heroEyebrow}>{hero.eyebrow}</Text>
            <Text style={[s.heroTitle, { marginVertical: spacing[5] }, h1]} accessibilityRole="header">
              {hero.titleA}
              <Text style={s.underlined}>{hero.highlight}</Text>
              {hero.titleB}
            </Text>
            <Text style={[s.heroText, body]}>{hero.text}</Text>
          </View>
        </View>
      </Band>

      {/* Products */}
      <Band pad={spacing[16]}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -16 }}>
          {products.map((p) => (
            <View key={p.id} style={{ width: compact ? '100%' : '50%', padding: 16, maxWidth: compact ? 520 : undefined, alignSelf: compact ? 'center' : undefined }}>
              <ProductCard p={p} phone={phone} buyLabel={buy} onBuy={() => buyNow(p.url)} />
            </View>
          ))}
        </View>
      </Band>

      {/* Book */}
      <Band pad={spacing[12]}>
        <View style={s.rule} />
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'center', paddingVertical: spacing[12] }}>
          <View style={{ flex: compact ? undefined : 1.1, paddingRight: compact ? 0 : spacing[10] }}>
            <Text style={[s.bookTitle, h2]}>
              <Text style={{ color: colors.teal }}>{book.titleTeal}</Text>
              <Text style={{ color: colors.black }}>{book.titleDark}</Text>
            </Text>
            <Text style={[g.text, { fontFamily: fonts.bodySemiBold, marginTop: spacing[6], marginBottom: spacing[3] }, body]}>{book.intro}</Text>
            {book.bullets.map((b) => (
              <View key={b} style={{ flexDirection: 'row', marginBottom: spacing[2] }}>
                <Text style={[g.text, body, { width: 20 }]}>{'\u2022'}</Text>
                <Text style={[g.text, { flex: 1 }, body]}>{b}</Text>
              </View>
            ))}
            <View style={{ marginTop: spacing[6], alignSelf: 'flex-start' }}><Button label={book.button} onPress={() => buyNow(book.url)} /></View>
          </View>
          <View style={{ flex: compact ? undefined : 0.9, width: compact ? '100%' : undefined, alignItems: 'center', marginTop: compact ? spacing[8] : 0 }}>
            <View style={[s.bookShadow, { width: '100%', maxWidth: 340 }]}><Photo image={book.image} label="Book cover" ratio={408 / 615} radius={4} /></View>
          </View>
        </View>
        <View style={s.rule} />
      </Band>

      {/* FAQ */}
      <Band pad={spacing[12]}>
        <View style={{ width: '100%', maxWidth: 920, alignSelf: 'center' }}>
          <View style={{ flexDirection: phone ? 'column' : 'row', alignItems: phone ? 'stretch' : 'center', justifyContent: 'space-between' }}>
            <Text style={[s.faqTitle, phone && { textAlign: 'center' }]}>{faq.title}</Text>
            <View style={[s.search, phone && { marginTop: spacing[5] }]}>
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder={faq.searchPlaceholder}
                placeholderTextColor={placeholderTextColor}
                accessibilityLabel="Search questions"
                style={s.searchInput}
              />
              <Icon name="search" size={20} color={colors.muted} />
            </View>
          </View>

          {!term && (
            <View style={s.tabs}>
              {faq.tabs.map((t) => (
                <Pressable key={t.id} onPress={() => { setTab(t.id); setOpenId(null); }} accessibilityRole="tab" accessibilityState={{ selected: t.id === tab }} style={[s.tab, t.id === tab && s.tabOn]}>
                  <Text style={s.tabText}>{t.label}</Text>
                </Pressable>
              ))}
            </View>
          )}

          <View style={{ marginTop: spacing[6] }}>
            {shown.length === 0 ? <Text style={[g.textMuted, { paddingVertical: spacing[6] }]}>{faq.empty}</Text> : null}
            {shown.map((f) => (
              <FaqItem key={f.id} item={f} open={openId === f.id} onToggle={() => setOpenId(openId === f.id ? null : f.id)} />
            ))}
          </View>
        </View>
      </Band>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  heroEyebrow: { fontFamily: fonts.navSemiBold, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.white },
  heroTitle: { fontFamily: fonts.headingRegular, color: colors.white },
  heroText: { fontFamily: fonts.bodySemiBold, color: colors.white, maxWidth: 520 },
  underlined: { textDecorationLine: 'underline', textDecorationColor: colors.yellow },

  cardTop: { flexDirection: 'row', alignItems: 'stretch', overflow: 'hidden' },
  corner: { position: 'absolute', top: 0, left: 0, width: 56, height: 56, backgroundColor: colors.pink, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  cardTitle: { fontFamily: fonts.navMedium, fontSize: 24, lineHeight: 32, color: colors.white },
  cardSub: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: '#E5E5E5', marginTop: spacing[3] },
  strip: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.yellow, padding: spacing[5] },
  stripText: { flex: 1, fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: colors.black },

  rule: { height: 1, backgroundColor: '#999999' },
  bookTitle: { fontFamily: fonts.headingRegular },
  bookShadow: { shadowColor: '#000', shadowOffset: { width: 12, height: 12 }, shadowOpacity: 0.25, shadowRadius: 18 },

  faqTitle: { fontFamily: fonts.navMedium, fontSize: 28, color: colors.ink },
  search: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.ink, width: 280, maxWidth: '100%', paddingBottom: 6 },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: colors.ink, paddingVertical: 4, outlineStyle: 'none' },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing[8], borderBottomWidth: 1, borderBottomColor: colors.line },
  tab: { paddingVertical: 12, paddingHorizontal: spacing[6], marginBottom: -1, borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabOn: { borderBottomColor: colors.ink },
  tabText: { fontFamily: fonts.body, fontSize: 14, color: colors.ink },

  faqItem: { borderBottomWidth: 1, borderBottomColor: '#F3B6CF' },
  faqHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing[6] },
  faqQ: { flex: 1, fontFamily: fonts.body, fontSize: 18, lineHeight: 26, color: colors.ink, paddingRight: spacing[4] },
  faqA: { fontFamily: fonts.body, fontSize: 15, lineHeight: 24, color: colors.ink, paddingBottom: spacing[6], paddingRight: spacing[8] },
});

export default ShopScreen;