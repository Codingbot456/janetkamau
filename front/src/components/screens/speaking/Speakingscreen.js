import React, { useState } from 'react';
import { View, Text, TextInput, Image, ImageBackground, Pressable, ScrollView, Linking, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { Button, useSafeNavigate } from '../../common/ui/ui';
import { Photo, Band, TextLink, ButtonRow, QuoteCarousel, LogoRow } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, spacing, layout, placeholderTextColor } from '../../../styles/globalStyles';
import { SPEAKING } from './content/speakingContent';

// Scroll to a section on web (sections carry nativeID). Falls back to nothing on native.
const scrollToId = (id) => {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    const el = document.getElementById(id);
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const Video = ({ url }) => {
  if (url && Platform.OS === 'web') {
    return (
      <View style={s.video}>
        {React.createElement('iframe', {
          title: 'Speaking reel', src: url, style: { border: 0, width: '100%', height: '100%' },
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture', allowFullScreen: true, loading: 'lazy',
        })}
      </View>
    );
  }
  return (
    <Pressable style={[s.video, s.videoEmpty]} onPress={url ? () => Linking.openURL(url) : undefined} accessibilityRole="button" accessibilityLabel="Play video">
      <View style={s.play}><Icon name="play-arrow" size={44} color={colors.black} /></View>
    </Pressable>
  );
};

const BookingForm = ({ form, phone }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState(null);
  const [sent, setSent] = useState(false);

  const set = (k, v) => { setValues((x) => ({ ...x, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: null })); };

  const submit = () => {
    const next = {};
    form.fields.forEach((f) => {
      if (f.required && !(values[f.key] || '').trim()) next[f.key] = 'This field is required';
    });
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Enter a valid email address';
    setErrors(next);
    if (Object.keys(next).length) return;
    // TODO: send `values` to your backend / email service / Google Sheet here.
    setSent(true);
  };

  if (sent) {
    return (
      <View style={s.formDone} accessibilityLiveRegion="polite">
        <Icon name="check-circle" size={40} color={colors.teal} />
        <Text style={[g.text, g.textCenter, { marginTop: spacing[4] }]}>{form.success}</Text>
      </View>
    );
  }

  return (
    <View style={{ width: '100%', maxWidth: 760, alignSelf: 'center' }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -10 }}>
        {form.fields.map((f) => (
          <View key={f.key} style={{ width: f.half && !phone ? '50%' : '100%', padding: 10 }}>
            <Text style={s.fieldLabel}>{f.label}{f.required ? ' *' : ''}</Text>
            <TextInput
              value={values[f.key] || ''}
              onChangeText={(v) => set(f.key, v)}
              onFocus={() => setFocus(f.key)}
              onBlur={() => setFocus(null)}
              keyboardType={f.keyboard}
              multiline={f.multiline}
              placeholder={f.hint}
              placeholderTextColor={placeholderTextColor}
              accessibilityLabel={f.label}
              style={[g.input, s.input, f.multiline && { minHeight: 96, textAlignVertical: 'top' }, focus === f.key && g.inputFocused, errors[f.key] && { borderColor: colors.danger }]}
            />
            {errors[f.key] ? <Text style={[g.error, { marginTop: 4 }]}>{errors[f.key]}</Text> : null}
          </View>
        ))}
      </View>
      <View style={{ padding: 10 }}><Button label={form.submit} onPress={submit} /></View>
    </View>
  );
};

const SpeakingScreen = () => {
  const go = useSafeNavigate();
  const { width } = useWindowDimensions();
  const compact = width < layout.desktop;
  const phone = width < layout.tablet;
  const { topBar, hero, trusted, intro, unique, topics, framework, reviews, downloads, rider, quotes, partner, banner, clients, moments, pull, headshots, form } = SPEAKING;

  const h1 = phone ? { fontSize: 32, lineHeight: 44 } : compact ? { fontSize: 42, lineHeight: 58 } : { fontSize: 48, lineHeight: 66 };
  const h2 = phone ? { fontSize: 26, lineHeight: 36 } : compact ? { fontSize: 30, lineHeight: 42 } : { fontSize: 36, lineHeight: 50 };
  const body = { fontSize: phone ? 15 : 16, lineHeight: phone ? 24 : 26 };
  const dir = compact ? 'column' : 'row';

  return (
    <PageLayout>
      {/* Yellow top strip */}
      <View style={s.topBar}>
        <Pressable onPress={() => go(topBar.route)} accessibilityRole="button">
          <Text style={s.topBarText}>{topBar.label}</Text>
        </Pressable>
      </View>

      {/* Hero */}
      <Band pad={spacing[12]}>
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'center' }}>
          <View style={{ flex: compact ? undefined : 1.1, paddingRight: compact ? 0 : spacing[10] }}>
            <Text style={g.eyebrow}>{hero.eyebrow}</Text>
            <Text style={[g.h1, { marginVertical: spacing[5] }, h1]} accessibilityRole="header">{hero.title}</Text>
            <Text style={[g.text, { marginBottom: spacing[6] }, body]}>{hero.text}</Text>
            <View style={s.buttonRow}>
              <View style={{ padding: 6 }}><Button label={hero.primary.label} onPress={() => scrollToId(hero.primary.anchor)} /></View>
              <View style={{ padding: 6 }}><Button label={hero.secondary.label} onPress={() => scrollToId(hero.secondary.anchor)} /></View>
            </View>
          </View>
          <View style={{ flex: compact ? undefined : 0.9, width: compact ? '100%' : undefined, marginTop: compact ? spacing[8] : 0, alignItems: compact ? 'stretch' : 'flex-end' }}>
            <View style={{ width: '100%', maxWidth: 480 }}><Photo image={hero.image} label="Jackline Ndiru on stage" ratio={4 / 5} /></View>
          </View>
        </View>
      </Band>

      {/* Trusted */}
      <Band bg={colors.black} pad={spacing[10]}>
        <LogoRow label={trusted.label} logos={trusted.logos} />
      </Band>

      {/* Video + intro */}
      <Band pad={spacing[12]}>
        <View style={{ width: '100%', maxWidth: 1000, alignSelf: 'center' }}>
          <Video url={intro.video.url} />
          <View style={{ marginTop: spacing[8], maxWidth: 760, alignSelf: 'center' }}>
            {intro.paragraphs.map((p, i) => <Text key={i} style={[g.text, { marginBottom: spacing[4] }, body]}>{p}</Text>)}
            <View style={{ marginTop: spacing[2] }}><Button label={intro.button.label} onPress={() => go(intro.button.route)} /></View>
          </View>
        </View>
      </Band>

      {/* What makes me unique */}
      <Band bg={colors.black}>
        <Text style={g.eyebrow}>{unique.eyebrow}</Text>
        <Text style={[s.darkTitle, { marginVertical: spacing[5] }, h2]}>{unique.title}</Text>
        <Text style={s.darkNote}>{unique.note}</Text>
        <View style={{ flexDirection: dir, marginHorizontal: -8 }}>
          {unique.items.map((it) => (
            <View key={it.id} style={{ flex: compact ? undefined : 1, padding: 8 }}>
              <View style={s.darkCard}>
                <Text style={s.darkCardTitle}>{it.title}</Text>
                <Text style={s.darkCardText}>{it.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </Band>

      {/* Most requested keynotes */}
      <View nativeID="topics">
        <Band bg={colors.white}>
          <Text style={g.eyebrow}>{topics.eyebrow}</Text>
          <View style={{ flexDirection: dir, alignItems: compact ? 'flex-start' : 'flex-end', justifyContent: 'space-between', marginTop: spacing[5], marginBottom: spacing[8] }}>
            <Text style={[g.h2, { maxWidth: 700 }, h2]}>{topics.title}</Text>
            <View style={{ marginTop: compact ? spacing[4] : 0 }}><Button label={topics.button.label} onPress={() => go(topics.button.route)} /></View>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 }}>
            {topics.items.map((t, i) => (
              <View key={t.id} style={{ width: compact ? '100%' : '50%', padding: 8 }}>
                <View style={s.tealCard}>
                  <Text style={s.tealNum}>{String(i + 1).padStart(2, '0')}</Text>
                  <Text style={s.tealTitle}>{t.title}</Text>
                  <Text style={s.tealText}>{t.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </Band>
      </View>

      {/* Framework */}
      <Band bg={colors.black}>
        <View style={{ flexDirection: dir, alignItems: compact ? 'stretch' : 'center' }}>
          <View style={{ flex: compact ? undefined : 1, paddingRight: compact ? 0 : spacing[10], marginBottom: compact ? spacing[8] : 0 }}>
            <Text style={g.eyebrow}>{framework.eyebrow}</Text>
            <Text style={[s.darkTitle, { marginVertical: spacing[5] }, h2]}>{framework.title}</Text>
            <Text style={[s.darkBody, body]}>{framework.text}</Text>
          </View>
          <View style={{ flex: compact ? undefined : 1 }}>
            {framework.steps.map((st, i) => (
              <View key={st.id} style={s.stepRow}>
                <Text style={s.stepNum}>{String(i + 1).padStart(2, '0')}</Text>
                <Text style={[s.darkBody, { flex: 1, fontSize: 15, lineHeight: 24 }]}>{st.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </Band>

      {/* Reviews */}
      <Band bg={colors.white}>
        <Text style={g.eyebrow}>{reviews.eyebrow}</Text>
        <Text style={[g.h2, { marginVertical: spacing[5] }, h2]}>{reviews.title}</Text>
        <View style={{ flexDirection: dir, marginHorizontal: -10 }}>
          {reviews.items.map((r) => (
            <View key={r.id} style={{ flex: compact ? undefined : 1, padding: 10 }}>
              <Text style={[g.text, { fontSize: 15, lineHeight: 24 }]}>{r.text}</Text>
              <Text style={s.reviewName}>{r.name}</Text>
              <Text style={g.textMuted}>{r.role}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: dir, marginHorizontal: -10, marginTop: spacing[4] }}>
          {reviews.photos.map((p) => (
            <View key={p.id} style={{ flex: compact ? undefined : 1, padding: 10 }}>
              <Photo image={p.image} label={p.label} ratio={4 / 3} radius={0} />
            </View>
          ))}
        </View>
      </Band>

      {/* Downloads */}
      <Band bg={colors.bar}>
        <Text style={g.eyebrow}>{downloads.eyebrow}</Text>
        <Text style={[g.h2, { marginVertical: spacing[5], maxWidth: 640 }, h2]}>{downloads.title}</Text>
        <View style={{ flexDirection: dir, marginHorizontal: -8 }}>
          {downloads.items.map((d) => (
            <View key={d.id} style={{ flex: compact ? undefined : 1, padding: 8 }}>
              <View style={s.whiteCard}>
                <Text style={[g.eyebrow, { fontSize: 12 }]}>{d.eyebrow}</Text>
                <Text style={s.cardTitle}>{d.title}</Text>
                <Text style={[g.textMuted, { fontSize: 14, lineHeight: 22, marginBottom: spacing[5] }]}>{d.text}</Text>
                <TextLink label={d.link.label} onPress={() => go(d.link.route)} />
              </View>
            </View>
          ))}
        </View>
      </Band>

      {/* Tech rider */}
      <Band bg={colors.white} pad={spacing[12]}>
        <Text style={g.eyebrow}>{rider.eyebrow}</Text>
        <Text style={[g.h2, { marginVertical: spacing[5] }, h2]}>{rider.title}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 }}>
          {rider.items.map((r) => (
            <View key={r} style={{ width: compact ? '100%' : '50%', padding: 6 }}>
              <View style={s.riderItem}><Text style={s.riderText}>{r}</Text></View>
            </View>
          ))}
        </View>
      </Band>

      {/* Teal testimonials */}
      <View style={{ flexDirection: dir, backgroundColor: colors.teal }}>
        {quotes.map((q) => (
          <View key={q.id} style={s.tealQuote}>
            <Text style={s.quoteMark}>{'\u201C'}</Text>
            <Text style={s.tealQuoteText}>{q.text}</Text>
            <Text style={s.tealQuoteName}>{q.name}</Text>
          </View>
        ))}
      </View>

      {/* Partner CTA */}
      <Band>
        <View style={{ alignItems: 'center' }}>
          <Text style={[g.h2, g.textCenter, { maxWidth: 760 }, h2]}>{partner.title}</Text>
          <Text style={[g.text, g.textCenter, { marginVertical: spacing[5], maxWidth: 560 }, body]}>{partner.text}</Text>
          <ButtonRow buttons={[partner.button]} go={go} center />
        </View>
      </Band>

      {/* Photo banner */}
      <ImageBackground source={banner.image} style={s.banner} resizeMode="cover">
        <View style={s.bannerOverlay}>
          <View style={[g.container, { alignItems: 'center' }]}>
            <Text style={[s.bannerText, phone && { fontSize: 24, lineHeight: 36 }]}>{banner.text}</Text>
            <View style={{ marginTop: spacing[6] }}><Button label={banner.button.label} onPress={() => go(banner.button.route)} /></View>
          </View>
        </View>
      </ImageBackground>

      {/* Clients & features */}
      <Band bg={colors.black} pad={spacing[10]}>
        <LogoRow label={clients.label} logos={clients.logos} big />
      </Band>

      {/* Speaking moments (horizontal scroll) */}
      <View style={{ backgroundColor: colors.white, paddingVertical: spacing[12] }}>
        <Text style={s.momentsTitle}>{moments.title}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing[6] }}>
          {moments.photos.map((p) => (
            <View key={p.id} style={{ width: phone ? 260 : 340, marginRight: spacing[4] }}>
              <Photo image={p.image} label={p.label} ratio={4 / 3} radius={0} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Pull quote */}
      <Band bg={colors.white} pad={spacing[12]}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[g.eyebrow, g.textCenter]}>{pull.label}</Text>
          <Text style={[s.pullText, phone && { fontSize: 22, lineHeight: 34 }]}>{pull.text}</Text>
        </View>
      </Band>

      {/* Headshots */}
      <Band bg={colors.bar} pad={spacing[12]}>
        <Text style={[s.headshotTitle, h2]}>{headshots.title}</Text>
        <Text style={[g.textMuted, g.textCenter, { marginBottom: spacing[8] }]}>{headshots.note}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginHorizontal: -8 }}>
          {headshots.photos.map((p) => (
            <Pressable key={p.id} accessibilityRole="button" accessibilityLabel="Download headshot" onPress={() => Linking.openURL(p.image.uri)} style={{ width: phone ? '50%' : compact ? '33.33%' : '20%', padding: 8 }}>
              <Photo image={p.image} label="Approved headshot of Jackline Ndiru" ratio={3 / 4} radius={0} />
            </Pressable>
          ))}
        </View>
      </Band>

      {/* Booking form */}
      <View nativeID="book">
        <Band bg={colors.white}>
          <Text style={[g.h2, g.textCenter, { marginBottom: spacing[8], textTransform: 'uppercase' }, h2]}>{form.title}</Text>
          <BookingForm form={form} phone={phone} />
        </Band>
      </View>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },

  topBar: { backgroundColor: colors.yellow, paddingVertical: 12, alignItems: 'center' },
  topBarText: { fontFamily: fonts.navBold, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.black },

  video: { width: '100%', aspectRatio: 16 / 9, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' },
  videoEmpty: { alignItems: 'center', justifyContent: 'center' },
  play: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },

  darkTitle: { fontFamily: fonts.headingRegular, color: colors.white, maxWidth: 760 },
  darkNote: { fontFamily: fonts.navSemiBold, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: '#B5B5B5', marginBottom: spacing[6] },
  darkBody: { fontFamily: fonts.body, color: '#E5E5E5' },
  darkCard: { flex: 1, borderWidth: 1, borderColor: '#3A3A3A', padding: spacing[5] },
  darkCardTitle: { fontFamily: fonts.navBold, fontSize: 13, letterSpacing: 1.4, textTransform: 'uppercase', color: colors.white, marginBottom: spacing[2] },
  darkCardText: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: '#B5B5B5' },

  tealCard: { backgroundColor: colors.teal, padding: spacing[8], minHeight: 200 },
  tealNum: { fontFamily: fonts.navBold, fontSize: 12, letterSpacing: 2, color: colors.white, opacity: 0.85 },
  tealTitle: { fontFamily: fonts.headingBold, fontSize: 24, lineHeight: 32, color: colors.white, marginVertical: spacing[3] },
  tealText: { fontFamily: fonts.body, fontSize: 15, lineHeight: 24, color: colors.white },

  stepRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: spacing[5], borderTopWidth: 1, borderTopColor: '#3A3A3A' },
  stepNum: { fontFamily: fonts.navBold, fontSize: 13, letterSpacing: 2, color: colors.yellow, width: 48 },

  reviewName: { fontFamily: fonts.navBold, fontSize: 12, letterSpacing: 1.6, textTransform: 'uppercase', color: colors.black, marginTop: spacing[4], marginBottom: 2 },

  whiteCard: { flex: 1, backgroundColor: colors.white, padding: spacing[6], borderWidth: 1, borderColor: colors.line },
  cardTitle: { fontFamily: fonts.navBold, fontSize: 16, letterSpacing: 1, textTransform: 'uppercase', color: colors.black, marginVertical: spacing[3] },

  riderItem: { borderWidth: 1, borderColor: colors.line, paddingVertical: 14, paddingHorizontal: spacing[5] },
  riderText: { fontFamily: fonts.navSemiBold, fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', color: colors.ink },

  tealQuote: { flex: 1, padding: spacing[12], alignItems: 'center' },
  quoteMark: { fontFamily: fonts.headingBold, fontSize: 64, lineHeight: 64, color: colors.white },
  tealQuoteText: { fontFamily: fonts.headingRegular, fontSize: 17, lineHeight: 28, textAlign: 'center', color: colors.white, marginVertical: spacing[4] },
  tealQuoteName: { fontFamily: fonts.navSemiBold, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: colors.white },

  banner: { width: '100%', minHeight: 420, backgroundColor: colors.black },
  bannerOverlay: { flex: 1, minHeight: 420, backgroundColor: 'rgba(0,0,0,0.62)', justifyContent: 'center', paddingVertical: spacing[16] },
  bannerText: { fontFamily: fonts.headingRegular, fontSize: 32, lineHeight: 46, color: colors.white, textAlign: 'center', maxWidth: 860 },

  momentsTitle: { fontFamily: fonts.headingBold, fontSize: 28, textTransform: 'uppercase', color: colors.heading, paddingHorizontal: spacing[6], marginBottom: spacing[6] },
  pullText: { fontFamily: fonts.headingRegular, fontStyle: 'italic', fontSize: 28, lineHeight: 42, color: colors.heading, textAlign: 'center', maxWidth: 780, marginTop: spacing[5] },
  headshotTitle: { fontFamily: fonts.headingBold, textTransform: 'uppercase', textAlign: 'center', color: colors.heading, marginBottom: spacing[2] },

  fieldLabel: { fontFamily: fonts.navSemiBold, fontSize: 12, letterSpacing: 0.6, color: colors.ink, marginBottom: spacing[2] },
  input: { borderRadius: 0, borderWidth: 0, borderBottomWidth: 1, backgroundColor: 'transparent', paddingHorizontal: 0 },
  formDone: { alignItems: 'center', paddingVertical: spacing[12], maxWidth: 560, alignSelf: 'center' },
});

export default SpeakingScreen;