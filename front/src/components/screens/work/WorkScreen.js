import React, { useState } from 'react';
import { View, Text, Pressable, Linking, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { Button, useSafeNavigate } from '../../common/ui/ui';
import { Photo, Band, ButtonRow, LogoRow } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, spacing, layout } from '../../../styles/globalStyles';
import { WORK } from './content/workContent';

const scrollToId = (id) => {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    const el = document.getElementById(id);
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Small tick used in lists and cards
const Check = ({ color = colors.teal, size = 18 }) => <Icon name="check-circle" size={size} color={color} style={{ marginRight: 10, marginTop: 2 }} />;

const CheckRow = ({ children, color, textStyle }) => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing[3] }}>
    <Check color={color} size={16} />
    <Text style={[{ flex: 1, fontFamily: fonts.body, fontSize: 14, lineHeight: 21 }, textStyle]}>{children}</Text>
  </View>
);

// Video box for client results. Shows a play button until a url is added.
const ResultVideo = ({ url }) => {
  if (url && Platform.OS === 'web') {
    return (
      <View style={s.resultVideo}>
        {React.createElement('iframe', {
          title: 'Client result', src: url, style: { border: 0, width: '100%', height: '100%' },
          allow: 'autoplay; clipboard-write; encrypted-media; picture-in-picture', allowFullScreen: true, loading: 'lazy',
        })}
      </View>
    );
  }
  return (
    <Pressable style={[s.resultVideo, { alignItems: 'center', justifyContent: 'center' }]} onPress={url ? () => Linking.openURL(url) : undefined} accessibilityRole="button" accessibilityLabel="Play client video">
      <View style={s.play}><Icon name="play-arrow" size={36} color={colors.black} /></View>
    </Pressable>
  );
};

const FaqItem = ({ item, open, onToggle }) => (
  <View style={s.faqItem}>
    <Pressable onPress={onToggle} accessibilityRole="button" accessibilityState={{ expanded: open }} style={s.faqHead}>
      <Text style={s.faqQ}>{item.q}</Text>
      <Icon name={open ? 'remove' : 'add'} size={22} color={colors.ink} />
    </Pressable>
    {open ? <Text style={s.faqA}>{item.a}</Text> : null}
  </View>
);

const WorkScreen = () => {
  const go = useSafeNavigate();
  const { width } = useWindowDimensions();
  const compact = width < layout.desktop;
  const phone = width < layout.tablet;
  const [openFaq, setOpenFaq] = useState('f1');
  const { hero, past, statement, who, sound, deeper, packages, book, achieve, why, reasons, results, faq, final } = WORK;

  const h1 = phone ? { fontSize: 32, lineHeight: 44 } : compact ? { fontSize: 42, lineHeight: 58 } : { fontSize: 48, lineHeight: 66 };
  const h2 = phone ? { fontSize: 26, lineHeight: 36 } : compact ? { fontSize: 30, lineHeight: 42 } : { fontSize: 36, lineHeight: 50 };
  const body = { fontSize: phone ? 15 : 16, lineHeight: phone ? 24 : 26 };
  const dir = compact ? 'column' : 'row';
  const gap = compact ? 0 : spacing[10];

  // Left column (title) + right column (text) used by several sections
  const Split = ({ left, right, align = 'flex-start' }) => (
    <View style={{ flexDirection: dir, alignItems: compact ? 'stretch' : align }}>
      <View style={{ flex: compact ? undefined : 1, paddingRight: gap, marginBottom: compact ? spacing[5] : 0 }}>{left}</View>
      <View style={{ flex: compact ? undefined : 1 }}>{right}</View>
    </View>
  );

  return (
    <PageLayout>
      {/* Hero */}
      <Band pad={spacing[12]}>
        <View style={{ flexDirection: compact ? 'column-reverse' : 'row', alignItems: 'center' }}>
          <View style={{ flex: compact ? undefined : 1.15, paddingRight: compact ? 0 : spacing[10], marginTop: compact ? spacing[8] : 0 }}>
            <Text style={g.eyebrow}>{hero.eyebrow}</Text>
            <Text style={[g.h1, { marginVertical: spacing[5] }, h1]} accessibilityRole="header">{hero.title}</Text>
            <Text style={[g.text, { marginBottom: spacing[6] }, body]}>{hero.text}</Text>
            <View style={{ alignSelf: 'flex-start' }}><Button label={hero.button.label} onPress={() => scrollToId(hero.button.anchor)} /></View>
          </View>
          <View style={{ flex: compact ? undefined : 0.85, width: compact ? '100%' : undefined, alignItems: compact ? 'stretch' : 'flex-end' }}>
            <View style={{ width: '100%', maxWidth: 460 }}><Photo image={hero.image} label="Portrait of Jackline Ndiru" ratio={460 / 580} /></View>
          </View>
        </View>
      </Band>

      {/* Past stages + statement */}
      <Band bg={colors.black} pad={spacing[10]}>
        <LogoRow label={past.label} logos={past.logos} />
      </Band>
      <Band bg={colors.black} pad={spacing[16]}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[s.statement, phone && { fontSize: 24, lineHeight: 38 }]}>{statement.text}</Text>
          <Text style={s.statementEnd}>{statement.closing}</Text>
        </View>
      </Band>

      {/* Who I work with */}
      <Band bg={colors.bar}>
        <Split
          left={<><Text style={g.eyebrow}>{who.eyebrow}</Text><Text style={[g.h2, { marginTop: spacing[5] }, h2]}>{who.title}</Text></>}
          right={who.paragraphs.map((p, i) => <Text key={i} style={[g.text, { marginBottom: spacing[4] }, body]}>{p}</Text>)}
        />
      </Band>

      {/* Does this sound like you */}
      <Band>
        <Split
          left={<><Text style={g.eyebrow}>{sound.eyebrow}</Text><Text style={[g.h2, { marginTop: spacing[5] }, h2]}>{sound.title}</Text></>}
          right={<Text style={[g.text, body]}>{sound.text}</Text>}
        />
        <View style={{ flexDirection: dir, marginHorizontal: -8, marginTop: spacing[8] }}>
          {sound.cards.map((c) => (
            <View key={c.id} style={{ flex: compact ? undefined : 1, padding: 8 }}>
              <View style={s.greyCard}>
                <Check size={26} />
                <Text style={s.cardTitle}>{c.title}</Text>
                <Text style={s.cardText}>{c.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </Band>

      {/* Let's dig deeper */}
      <Band bg={colors.bar}>
        <Split
          left={<><Text style={g.eyebrow}>{deeper.eyebrow}</Text><Text style={[g.h2, { marginTop: spacing[5] }, h2]}>{deeper.title}</Text></>}
          right={<>
            {deeper.paragraphs.map((p, i) => <Text key={i} style={[g.text, { marginBottom: spacing[4] }, body]}>{p}</Text>)}
            <Text style={[g.text, { fontStyle: 'italic', color: colors.muted }, body]}>{deeper.note}</Text>
          </>}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8, marginTop: spacing[8] }}>
          {deeper.cards.map((c, i) => (
            <View key={c.id} style={{ width: compact ? '100%' : '50%', padding: 8 }}>
              <View style={s.tealCard}>
                <Text style={s.tealNum}>{String(i + 1).padStart(2, '0')}</Text>
                <Text style={s.tealTitle}>{c.title}</Text>
                {c.items.map((it) => <CheckRow key={it} color={colors.white} textStyle={{ color: colors.white }}>{it}</CheckRow>)}
              </View>
            </View>
          ))}
        </View>
        <View style={{ alignItems: 'center', marginTop: spacing[8] }}>
          <Button label={deeper.button.label} onPress={() => scrollToId(deeper.button.anchor)} />
        </View>
      </Band>

      {/* Three ways to work together */}
      <View nativeID="packages">
        <Band>
          <Text style={g.eyebrow}>{packages.eyebrow}</Text>
          <Text style={[g.h2, { marginTop: spacing[5], marginBottom: spacing[8], maxWidth: 640 }, h2]}>{packages.title}</Text>
          <View style={{ flexDirection: dir, marginHorizontal: -8 }}>
            {packages.items.map((p, i) => (
              <View key={p.id} style={{ flex: compact ? undefined : 1, padding: 8 }}>
                <View style={s.packageCard}>
                  <Text style={s.tealNumDark}>{String(i + 1).padStart(2, '0')}</Text>
                  <Text style={s.packageName}>{p.name}</Text>
                  <Text style={s.cardText}>{p.best}</Text>
                  <Text style={s.included}>What is included</Text>
                  {p.included.map((it) => <CheckRow key={it} textStyle={{ color: colors.ink }}>{it}</CheckRow>)}
                  <View style={{ marginTop: spacing[4] }}>
                    <Pressable onPress={() => go(packages.button.route)} accessibilityRole="button" style={s.inquire}>
                      <Text style={s.inquireText}>{packages.button.label}</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Band>
      </View>

      {/* Book */}
      <Band bg="#3A3A3A">
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'center' }}>
          <View style={{ flex: compact ? undefined : 0.7, width: compact ? '100%' : undefined, alignItems: 'center', paddingRight: compact ? 0 : spacing[10] }}>
            <View style={{ width: '100%', maxWidth: 280 }}><Photo image={book.image} label="Book cover" ratio={408 / 615} radius={4} /></View>
          </View>
          <View style={{ flex: compact ? undefined : 1, marginTop: compact ? spacing[8] : 0 }}>
            <Text style={g.eyebrow}>{book.eyebrow}</Text>
            <Text style={[s.darkTitle, { marginVertical: spacing[4] }, h2]}>{book.title}</Text>
            <Text style={[s.darkBody, { marginBottom: spacing[6] }, body]}>{book.text}</Text>
            <View style={{ alignSelf: 'flex-start' }}><Button label={book.button.label} onPress={() => go(book.button.route)} /></View>
          </View>
        </View>
      </Band>

      {/* What we can achieve */}
      <Band>
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'center' }}>
          <View style={{ flex: compact ? undefined : 1.1, paddingRight: compact ? 0 : spacing[10] }}>
            <Text style={g.eyebrow}>{achieve.eyebrow}</Text>
            <Text style={[g.h2, { marginVertical: spacing[5] }, h2]}>{achieve.title}</Text>
            {achieve.items.map((a) => (
              <View key={a.id} style={{ flexDirection: 'row', marginTop: spacing[5] }}>
                <Check size={22} />
                <View style={{ flex: 1 }}>
                  <Text style={s.achieveTitle}>{a.title}</Text>
                  <Text style={[g.text, { fontSize: 15, lineHeight: 24 }]}>{a.text}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={{ flex: compact ? undefined : 0.9, width: compact ? '100%' : undefined, marginTop: compact ? spacing[8] : 0 }}>
            <Photo image={achieve.image} label="Group of clients with Jackline" ratio={4 / 5} radius={0} />
          </View>
        </View>
      </Band>

      {/* Why Jackline */}
      <Band bg={colors.white} pad={spacing[12]}>
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'center' }}>
          <View style={{ flex: compact ? undefined : 0.8, width: compact ? '100%' : undefined, paddingRight: compact ? 0 : spacing[10] }}>
            <Photo image={why.image} label="Jackline Ndiru coaching" ratio={4 / 5} radius={0} />
          </View>
          <View style={{ flex: compact ? undefined : 1.2, marginTop: compact ? spacing[8] : 0 }}>
            <Text style={g.eyebrow}>{why.eyebrow}</Text>
            <Text style={[g.h2, { marginVertical: spacing[5] }, h2]}>{why.title}</Text>
            {why.paragraphs.map((p, i) => <Text key={i} style={[g.text, { marginBottom: spacing[4] }, body]}>{p}</Text>)}
          </View>
        </View>
      </Band>

      {/* Reasons */}
      <Band>
        <Text style={g.eyebrow}>{reasons.eyebrow}</Text>
        <Text style={[g.h2, { marginVertical: spacing[5] }, h2]}>{reasons.title}</Text>
        <View style={[s.reasonGrid, { marginTop: spacing[6] }]}>
          {reasons.items.map((r, i) => (
            <View key={r.id} style={[s.reasonCell, { width: compact ? '100%' : '50%' }]}>
              <Text style={s.tealNumDark}>{String(i + 1).padStart(2, '0')}</Text>
              <Text style={s.reasonTitle}>{r.title}</Text>
              <Text style={s.cardText}>{r.text}</Text>
            </View>
          ))}
        </View>
      </Band>

      {/* Client results */}
      <Band bg={colors.bar}>
        <Text style={[g.eyebrow, { marginBottom: spacing[6] }]}>{results.eyebrow}</Text>
        <View style={{ flexDirection: compact ? 'column' : 'row', marginHorizontal: -10 }}>
          {results.items.map((r) => (
            <View key={r.id} style={{ flex: compact ? undefined : 1, padding: 10 }}>
              <View style={s.whiteCard}>
                <ResultVideo url={r.videoUrl} />
                <Text style={s.resultCaption}>{r.caption}</Text>
                <Text style={s.resultName}>{r.name} · {r.role}</Text>
              </View>
            </View>
          ))}
        </View>
      </Band>

      {/* FAQ */}
      <Band pad={spacing[16]}>
        <View style={{ width: '100%', maxWidth: 860, alignSelf: 'center' }}>
          <Text style={[g.eyebrow, g.textCenter]}>Frequently asked questions</Text>
          <Text style={[g.h2, g.textCenter, { marginVertical: spacing[5], marginBottom: spacing[8] }, h2]}>{faq.title}</Text>
          {faq.items.map((f) => (
            <FaqItem key={f.id} item={f} open={openFaq === f.id} onToggle={() => setOpenFaq(openFaq === f.id ? null : f.id)} />
          ))}
        </View>
      </Band>

      {/* Final CTA */}
      <Band bg={colors.black} pad={spacing[10]}>
        <LogoRow label={past.label} logos={past.logos} />
      </Band>
      <Band bg={colors.black} pad={spacing[16]}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[s.darkTitle, g.textCenter, { maxWidth: 760 }, h2]}>{final.title}</Text>
          <Text style={[s.darkBody, g.textCenter, { marginVertical: spacing[5], maxWidth: 560 }, body]}>{final.text}</Text>
          <ButtonRow buttons={[final.primary, final.secondary]} go={go} center />
        </View>
      </Band>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  statement: { fontFamily: fonts.headingRegular, fontStyle: 'italic', fontSize: 30, lineHeight: 46, color: colors.white, textAlign: 'center', maxWidth: 820 },
  statementEnd: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.white, marginTop: spacing[6] },

  greyCard: { flex: 1, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, padding: spacing[6] },
  cardTitle: { fontFamily: fonts.navBold, fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase', color: colors.black, marginVertical: spacing[3] },
  cardText: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.muted },

  tealCard: { backgroundColor: colors.teal, padding: spacing[6], minHeight: 220 },
  tealNum: { fontFamily: fonts.navBold, fontSize: 12, letterSpacing: 2, color: colors.white, opacity: 0.85 },
  tealTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.white, marginVertical: spacing[3] },
  tealNumDark: { fontFamily: fonts.navBold, fontSize: 12, letterSpacing: 2, color: colors.teal },

  packageCard: { flex: 1, backgroundColor: colors.bar, borderWidth: 1, borderColor: colors.line, padding: spacing[6] },
  packageName: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.heading, marginVertical: spacing[3] },
  included: { fontFamily: fonts.navBold, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.black, marginTop: spacing[5], marginBottom: spacing[3] },
  inquire: { borderWidth: 1, borderColor: colors.black, paddingVertical: 12, alignItems: 'center' },
  inquireText: { fontFamily: fonts.navBold, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.black },

  darkTitle: { fontFamily: fonts.headingRegular, color: colors.white },
  darkBody: { fontFamily: fonts.body, color: '#E5E5E5' },

  achieveTitle: { fontFamily: fonts.navBold, fontSize: 13, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.black, marginBottom: spacing[1] },

  reasonGrid: { flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: colors.line },
  reasonCell: { padding: spacing[8], borderWidth: 0.5, borderColor: colors.line },
  reasonTitle: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.heading, marginVertical: spacing[3] },

  whiteCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, padding: spacing[4] },
  resultVideo: { width: '100%', aspectRatio: 16 / 9, backgroundColor: colors.bar, overflow: 'hidden' },
  play: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
  resultCaption: { fontFamily: fonts.headingRegular, fontSize: 18, lineHeight: 28, color: colors.heading, marginTop: spacing[4] },
  resultName: { fontFamily: fonts.body, fontSize: 13, color: colors.muted, marginTop: spacing[2] },

  faqItem: { borderBottomWidth: 1, borderBottomColor: colors.line },
  faqHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing[5] },
  faqQ: { flex: 1, fontFamily: fonts.bodySemiBold, fontSize: 16, lineHeight: 24, color: colors.ink, paddingRight: spacing[4] },
  faqA: { fontFamily: fonts.body, fontSize: 15, lineHeight: 24, color: colors.muted, paddingBottom: spacing[5], paddingRight: spacing[8] },
});

export default WorkScreen;