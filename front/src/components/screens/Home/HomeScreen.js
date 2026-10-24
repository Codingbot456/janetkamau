import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Linking, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import PageLayout from '../../navigation/layout/web/PageLayout';

import { SITE, SERVICE_GROUPS } from '../../navigation/childNav/webNav/siteConfig';

import { scrollToAnchor } from '../../navigation/layout/anchors';
import { Photo, Section, ArrowButton, ArrowLink, CheckRow } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout, placeholderTextColor } from '../../../styles/globalStyles';
import { HOME } from './content/homeContent';
import Reveal, { ScrollFillText, TypeWriter } from '../../common/ui/Reveal';

// ---------------- Small building blocks ----------------
const Label = ({ children }) => (
  <Reveal>
    <View style={s.labelRow}>
      <View style={s.labelLine} />
      <Text style={s.labelText}>{children}</Text>
    </View>
  </Reveal>
);

// Rows with a hairline between them (used for process, reasons and client words)
const RowList = ({ rows, big }) => (
  <View style={{ borderTopWidth: 1, borderTopColor: colors.border }}>
    {rows.map((r, i) => (
      <Reveal key={r.id} delay={Math.min(i, 5) * 60} distance={20}>
      <View style={s.row}>
        <View style={{ flex: 1, paddingRight: spacing[6] }}>
          <Text style={[s.rowTitle, big && s.rowTitleBig]}>{r.title}</Text>
          {r.text ? <Text style={s.rowText}>{r.text}</Text> : null}
        </View>
        <Text style={s.rowTag}>{r.tag}</Text>
      </View>
      </Reveal>
    ))}
  </View>
);

// Services: big list of groups. Desktop: list on the left, details on the right.
// Small screens: accordion, the active group opens in place under its title.
const ServiceList = ({ groups, items, texts, compact, cta }) => {
  const [active, setActive] = useState(groups[0].id);

  const details = (id) => (
    <View>
      <View style={s.tags}>
        {items.filter((i) => i.group === id).map((c) => <View key={c.id} style={s.tag}><Text style={s.tagText}>{c.title}</Text></View>)}
      </View>
      <Text style={s.groupText}>{texts[id]}</Text>
      <ArrowLink label={cta} onPress={() => scrollToAnchor('contact')} />
    </View>
  );

  const title = (gr, i, on) => (
    <Pressable
      key={gr.id}
      onPress={() => setActive(gr.id)}
      onHoverIn={compact ? undefined : () => setActive(gr.id)}
      accessibilityRole="button"
      accessibilityState={compact ? { expanded: on } : { selected: on }}
      style={s.groupRow}
    >
      <Text style={s.groupNum}>{'0' + (i + 1)}</Text>
      <Text style={[s.groupTitle, compact && { fontSize: 32, lineHeight: 40 }, !on && s.groupOff]}>{gr.label}</Text>
    </Pressable>
  );

  if (compact) {
    return (
      <View>
        {groups.map((gr, i) => {
          const on = gr.id === active;
          return (
            <View key={gr.id}>
              {title(gr, i, on)}
              {on ? <View style={{ paddingLeft: 36, paddingTop: spacing[3], paddingBottom: spacing[5] }}>{details(gr.id)}</View> : null}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <View style={{ flex: 1 }}>{groups.map((gr, i) => title(gr, i, gr.id === active))}</View>
      <View style={{ flex: 1 }}>{details(active)}</View>
    </View>
  );
};

const Accordion = ({ items }) => {
  const [openId, setOpenId] = useState(items[0] && items[0].id);
  return (
    <View style={{ borderTopWidth: 1, borderTopColor: colors.border }}>
      {items.map((it) => {
        const open = openId === it.id;
        return (
          <View key={it.id} style={s.faqItem}>
            <Pressable onPress={() => setOpenId(open ? null : it.id)} accessibilityRole="button" accessibilityState={{ expanded: open }} style={s.faqHead}>
              <Text style={s.faqQ}>{it.q}</Text>
              <Icon name={open ? 'remove' : 'add'} size={24} color={colors.text} />
            </Pressable>
            {open ? <Text style={s.faqA}>{it.a}</Text> : null}
          </View>
        );
      })}
    </View>
  );
};

// ---------------- Contact form (underlined fields, chips on the right, orange Send) ----------------
const ContactForm = ({ form, compact, phone }) => {
  const [topic, setTopic] = useState(null);
  const [budget, setBudget] = useState(null);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState(null);
  const [sent, setSent] = useState(false);

  const set = (k, v) => { setValues((x) => ({ ...x, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: null })); };

  const submit = () => {
    const next = {};
    form.fields.forEach((f) => { if (f.required && !(values[f.key] || '').trim()) next[f.key] = 'This field is required'; });
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Enter a valid email address';
    setErrors(next);
    if (Object.keys(next).length) return;
    // TODO: send { topic, budget, ...values } to your backend or email service here.
    setSent(true);
  };

  if (sent) {
    return (
      <View style={s.done} accessibilityLiveRegion="polite">
        <Icon name="check-circle" size={48} color={colors.accent} />
        <Text style={[g.text, g.textCenter, { marginTop: spacing[4] }]}>{form.success}</Text>
      </View>
    );
  }

  const Chips = ({ label, options, value, onChange }) => (
    <View style={{ marginBottom: spacing[6] }}>
      <Text style={s.chipLabel}>{label}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 }}>
        {options.map((t) => {
          const on = t === value;
          return (
            <Pressable key={t} onPress={() => onChange(on ? null : t)} accessibilityRole="button" accessibilityState={{ selected: on }} style={[s.pill, on && s.pillOn]}>
              <Text style={[s.pillText, on && { color: colors.onAccent }]}>{t}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  return (
    <View>
      <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: compact ? undefined : 1, width: compact ? '100%' : undefined, paddingRight: compact ? 0 : spacing[12], marginBottom: compact ? spacing[8] : 0 }}>
          {form.fields.map((f) => (
            <View key={f.key} style={{ marginBottom: spacing[5] }}>
              <TextInput
                value={values[f.key] || ''}
                onChangeText={(v) => set(f.key, v)}
                onFocus={() => setFocus(f.key)}
                onBlur={() => setFocus(null)}
                keyboardType={f.keyboard}
                multiline={f.multiline}
                placeholder={f.label + (f.required ? '*' : '')}
                placeholderTextColor={placeholderTextColor}
                accessibilityLabel={f.label}
                style={[s.line, f.multiline && { minHeight: 90, textAlignVertical: 'top' }, focus === f.key && { borderBottomColor: colors.accent }, errors[f.key] && { borderBottomColor: colors.danger }]}
              />
              {errors[f.key] ? <Text style={[g.error, { marginTop: 4 }]}>{errors[f.key]}</Text> : null}
            </View>
          ))}
        </View>
        <View style={{ flex: compact ? undefined : 1, width: compact ? '100%' : undefined }}>
          <Chips label={form.topicLabel} options={form.topics} value={topic} onChange={setTopic} />
          {form.budgets && !phone ? <Chips label={form.budgetLabel} options={form.budgets} value={budget} onChange={setBudget} /> : null}
          {form.budgets && phone ? (
            <TextInput
              value={budget || ''}
              onChangeText={setBudget}
              placeholder={form.budgetPlaceholder || form.budgetLabel}
              placeholderTextColor={placeholderTextColor}
              accessibilityLabel={form.budgetLabel}
              style={[s.line, { marginBottom: spacing[6] }]}
            />
          ) : null}
        </View>
      </View>

      <Pressable onPress={submit} accessibilityRole="button" accessibilityLabel={form.submit} style={s.sendWrap}>
        <View style={s.sendShape} />
        <Text style={s.sendText}>Send</Text>
      </Pressable>
      <Text style={[g.textMuted, g.textCenter, { marginTop: spacing[2] }]}>{form.note}</Text>
    </View>
  );
};

// ---------------- Page ----------------
const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const compact = width < layout.desktop;
  const phone = width < layout.tablet;
  const { hero, intro, stats, labels, services, why, projects, process, testimonials, packages, about, faqs, quote, clients, cta, contact } = HOME;
  const [slide, setSlide] = useState(0);

  const h1 = phone ? { fontSize: 40, lineHeight: 44 } : compact ? { fontSize: 56, lineHeight: 60 } : { fontSize: 80, lineHeight: 82 };
  const big = phone ? { fontSize: 36, lineHeight: 40 } : compact ? { fontSize: 52, lineHeight: 56 } : { fontSize: 72, lineHeight: 74 };
  const col3 = phone ? '100%' : compact ? '50%' : '33.333%';
  const cardW = Math.round(width * 0.8);
  const n = projects.items.length;
  const cur = projects.items[slide];
  const pad2 = (x) => (x < 10 ? '0' + x : '' + x);
  const waUrl = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage || '')}` : null;
  const open = (url) => { if (url) Linking.openURL(url); };

  const projectCard = (p, i) => (
    <View>
      <Photo image={p.image} label={p.title} ratio={4 / 3} radius={0} />
      <View style={{ flexDirection: 'row', marginTop: spacing[3] }}>
        <View style={s.num}><Text style={s.numText}>{pad2(i + 1)}</Text></View>
        <View style={{ flex: 1, marginLeft: spacing[3] }}>
          <Text style={s.projectTitle}>{p.title}</Text>
          <Text style={s.projectTags}>{p.type} / {p.did.join(' / ')}</Text>
          {p.url ? <View style={{ marginTop: spacing[2] }}><ArrowLink label={projects.linkLabel} onPress={() => open(p.url)} /></View> : null}
        </View>
      </View>
    </View>
  );

  return (
    <PageLayout>
      {/* ================= Hero ================= */}
      <Section id="home" pad={0} style={{ paddingTop: layout.navHeight + spacing[8], paddingBottom: spacing[8], overflow: 'hidden' }}>
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <View style={[s.diag, { transform: [{ rotate: '32deg' }] }]} />
          <View style={[s.diag, { transform: [{ rotate: '-32deg' }] }]} />
          <Text style={[s.diagText, phone && { right: '4%', top: '34%' }]}>{hero.tag}</Text>
        </View>

        <Reveal distance={20}>
          <View style={{ marginBottom: spacing[4] }}>
            <TypeWriter prefix={hero.typing.prefix} words={hero.typing.words} style={s.typing} wordStyle={s.typingWord} />
          </View>
        </Reveal>
        <Reveal distance={50} duration={900}>
          <Text style={[g.h1, s.h1, h1]} accessibilityRole="header">{hero.title}</Text>
        </Reveal>

        <Reveal delay={200}>
        <View style={[s.heroBottom, phone && { flexDirection: 'column', alignItems: 'flex-start', marginTop: spacing[10] }]}>
          <View>
            <Text style={s.reviewedOn}>REVIEWED BY</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={16} color={colors.accent} />)}
              <Text style={[s.reviewedOn, { marginLeft: spacing[2] }]}>{hero.badge.text.toUpperCase()}</Text>
            </View>
          </View>
          <Pressable onPress={() => scrollToAnchor('contact')} accessibilityRole="button" style={[s.newProject, phone && { marginTop: spacing[5], alignSelf: 'flex-end' }]}>
            <Text style={s.newProjectText}>{hero.newProject}</Text>
          </Pressable>
        </View>
        </Reveal>

        {/* project slider */}
        <Reveal delay={350} distance={60} duration={900}>
        <View style={{ marginTop: spacing[8] }}>
          <View style={phone ? s.bleed : null}>
          <Photo image={cur.image} label={cur.title} ratio={phone ? 5 / 4 : 21 / 9} radius={0} />
          <View style={[s.ticker, phone && s.tickerPhone]}>
            {hero.ticker.map((t, i) => (
              <View key={t} style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
                {i > 0 ? <View style={s.tickerDot} /> : null}
                <Text style={s.tickerText}>{t}</Text>
              </View>
            ))}
          </View>
          </View>
          <View style={s.progress}><View style={[s.progressFill, { width: `${((slide + 1) / n) * 100}%` }]} /></View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: spacing[3] }}>
            <View style={{ flex: 1, paddingRight: spacing[4] }}>
              <Text style={s.slideTitle}>{cur.title}</Text>
              <Text style={s.slideTags}>{cur.type} / {cur.did.join(' / ')}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable onPress={() => setSlide((slide - 1 + n) % n)} accessibilityRole="button" accessibilityLabel="Previous project"><Icon name="chevron-left" size={26} color={colors.text} /></Pressable>
              <Text style={s.counter}>{pad2(slide + 1)} / {pad2(n)}</Text>
              <Pressable onPress={() => setSlide((slide + 1) % n)} accessibilityRole="button" accessibilityLabel="Next project"><Icon name="chevron-right" size={26} color={colors.text} /></Pressable>
            </View>
          </View>
        </View>
        </Reveal>
      </Section>

      {/* ================= Intro ================= */}
      <Section id={intro.id}>
        <Reveal style={{ paddingLeft: compact ? 0 : '25%', maxWidth: compact ? '100%' : '75%' }}>
          <Text style={[g.text, s.intro, phone && { fontSize: 18, lineHeight: 28 }]}>{intro.text}</Text>
          <Pressable onPress={() => scrollToAnchor(intro.link.anchor)} accessibilityRole="link" style={{ marginTop: spacing[3] }}>
            <Text style={s.introLink}>{intro.link.label}  {'\u203A'}</Text>
          </Pressable>
        </Reveal>
      </Section>

      {/* ================= Stats ================= */}
      <Section id={stats.id} bg={colors.teal}>
        <View style={{ flexDirection: phone ? 'column' : 'row' }}>
          {stats.items.map((st, i) => (
            <Reveal key={st.id} delay={i * 140} style={{ flex: phone ? undefined : 1, paddingRight: phone ? 0 : spacing[8], paddingLeft: phone && i % 2 === 1 ? '42%' : 0, marginBottom: phone ? spacing[8] : 0 }}>
              <Text style={[s.statValue, phone ? { fontSize: 64, lineHeight: 68 } : { fontSize: 104, lineHeight: 108 }]}>{st.value}</Text>
              <View style={s.statLine} />
              <Text style={[s.statLabel, phone && i % 2 === 0 && { maxWidth: '62%' }]}>{st.label}</Text>
            </Reveal>
          ))}
        </View>
      </Section>

      {/* ================= Meet Janet ================= */}
      <Section id={about.id}>
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'center' }}>
          <Reveal style={[{ flex: compact ? undefined : 1.3, width: compact ? '100%' : undefined, marginBottom: compact ? spacing[8] : 0, paddingRight: compact ? 0 : spacing[10] }, phone && { width: undefined, alignSelf: 'stretch', marginHorizontal: -spacing[6] }]}>
            <Photo image={about.photo} label={`${SITE.name} at work`} ratio={16 / 10} radius={0} />
          </Reveal>
          <Reveal delay={150} style={{ flex: compact ? undefined : 1 }}>
            <Text style={[s.sectionTitle, phone && { fontSize: 32, lineHeight: 38 }]}>Meet {SITE.name}</Text>
            {about.paragraphs.slice(0, 2).map((p) => <Text key={p} style={[g.textMuted, { marginBottom: spacing[3], lineHeight: 24 }]}>{p}</Text>)}
            <View style={{ marginTop: spacing[2] }}><ArrowLink label={about.button.label} onPress={() => scrollToAnchor(about.button.anchor)} /></View>
          </Reveal>
        </View>
      </Section>

      {/* ================= Case studies ================= */}
      <Section id={projects.id}>
        <Label>{labels.work}</Label>
        {phone ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={cardW + spacing[3]} decelerationRate="fast" style={s.bleed} contentContainerStyle={{ paddingHorizontal: spacing[6] }}>
            {projects.items.map((p, i) => (
              <View key={p.id} style={{ width: cardW, marginRight: spacing[3] }}>{projectCard(p, i)}</View>
            ))}
          </ScrollView>
        ) : (
          <View style={s.grid}>
            {projects.items.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 120} style={{ width: col3, padding: 10 }}>{projectCard(p, i)}</Reveal>
            ))}
          </View>
        )}
      </Section>

      {/* ================= Contact ================= */}
      <Section id={contact.id}>
        <Reveal>
          <Text style={[s.contactTitle, !phone && g.textCenter, phone && { fontSize: 28, lineHeight: 34, alignSelf: 'flex-start' }]}>{contact.heading}</Text>
        </Reveal>
        <Reveal delay={150} style={{ marginTop: spacing[10] }}>
          <ContactForm form={contact.form} compact={compact} phone={phone} />
        </Reveal>
        {waUrl ? (
          <View style={{ alignItems: 'center', marginTop: spacing[6] }}>
            <ArrowLink label={contact.whatsappText} onPress={() => open(waUrl)} />
          </View>
        ) : null}
      </Section>

      {/* ================= Big quote ================= */}
      <Section id={quote.id}>
        <Icon name="format-quote" size={phone ? 44 : 64} color={colors.accent} />
        <ScrollFillText text={quote.text} style={[s.quoteText, big]} />
      </Section>

      {/* ================= Clients ================= */}
      <Section id="clients" bg={colors.surfaceHigh}>
        <Label>{labels.clients}</Label>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {clients.map((c, i) => (
            <Reveal key={c} delay={(i % 4) * 90} distance={24} style={{ width: phone ? '50%' : '25%', alignItems: 'center', paddingVertical: spacing[8] }}>
              <Text style={s.clientName}>{c}</Text>
            </Reveal>
          ))}
        </View>
      </Section>

      {/* ================= Services ================= */}
      <Section id={services.id}>
        <Label>{labels.services}</Label>
        <Reveal>
          <ServiceList groups={SERVICE_GROUPS} items={services.items} texts={services.groupText} compact={compact} cta="Start a project" />
        </Reveal>
      </Section>

      {/* ================= Why Janet ================= */}
      <Section id={why.id}>
        <Label>{labels.why}</Label>
        <RowList rows={why.reasons.map((r) => ({ id: r.id, title: r.title, text: r.text, tag: r.tag }))} />
      </Section>

      {/* ================= Process ================= */}
      <Section id={process.id}>
        <Label>{labels.process}</Label>
        <RowList rows={process.steps.map((st, i) => ({ id: st.id, title: st.title, text: st.text, tag: 'Step ' + pad2(i + 1) }))} />
      </Section>

      {/* ================= Client words ================= */}
      <Section id={testimonials.id}>
        <Label>{labels.words}</Label>
        <RowList big rows={testimonials.items.map((tm) => ({ id: tm.id, title: tm.quote, text: tm.role, tag: tm.name }))} />
      </Section>

      {/* ================= Packages ================= */}
      <Section id={packages.id}>
        <Label>{labels.packages}</Label>
        <View style={s.grid}>
          {packages.items.map((pk, i) => (
            <Reveal key={pk.id} delay={i * 120} style={{ width: col3, padding: 10 }}>
              <View style={[s.pack, pk.featured && { borderTopColor: colors.accent, borderTopWidth: 3 }]}>
                {pk.featured ? <Text style={s.packTag}>{pk.tag}</Text> : null}
                <Text style={s.packName}>{pk.name}</Text>
                <Text style={s.packBest}>{pk.best}</Text>
                <Text style={s.price}>{packages.price}</Text>
                <View style={{ marginBottom: spacing[6] }}>
                  {pk.includes.map((b) => <CheckRow key={b}>{b}</CheckRow>)}
                </View>
                <View style={{ marginTop: 'auto' }}>
                  <ArrowButton label={packages.button.label} small onPress={() => scrollToAnchor(packages.button.anchor)} />
                </View>
              </View>
            </Reveal>
          ))}
        </View>
      </Section>

      {/* ================= FAQs ================= */}
      <Section id={faqs.id}>
        <Label>{labels.faqs}</Label>
        <View style={{ width: '100%', maxWidth: 880 }}>
          <Reveal><Accordion items={faqs.items} /></Reveal>
        </View>
      </Section>

      {/* ================= Closing call to action ================= */}
      <Section id="cta" bg={colors.text}>
        <Reveal>
        <Text style={[s.ctaText, phone && { fontSize: 30, lineHeight: 36 }]}>
          {cta.text}{' '}
          <Text style={{ color: colors.accent }} onPress={() => scrollToAnchor('contact')} accessibilityRole="link">{cta.link} {'\u203A'}</Text>
        </Text>
        {SITE.email ? (
          <Text style={[s.ctaText, phone && { fontSize: 30, lineHeight: 36 }]} onPress={() => open('mailto:' + SITE.email)} accessibilityRole="link">{SITE.email}</Text>
        ) : null}
        </Reveal>
      </Section>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  // section labels
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing[10] },
  labelLine: { width: 56, height: 1, backgroundColor: colors.text, marginRight: spacing[3] },
  labelText: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.xs, color: colors.textSoft },

  // hero
  typing: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.base, color: colors.textSoft },
  typingWord: { color: colors.accentDark },
  h1: { letterSpacing: -3, maxWidth: 1100 },
  diag: { position: 'absolute', left: '50%', top: '50%', width: 2600, height: 1, marginLeft: -1300, backgroundColor: colors.border },
  diagText: { position: 'absolute', right: '18%', top: '46%', fontFamily: fonts.body, fontSize: fontSizes.xs, color: colors.textSoft, transform: [{ rotate: '-32deg' }] },
  bleed: { marginHorizontal: -spacing[6] },
  tickerPhone: { flexWrap: 'nowrap', overflow: 'hidden' },
  heroBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: spacing[20] },
  reviewedOn: { fontFamily: fonts.body, fontSize: fontSizes.xs, letterSpacing: 1, color: colors.textSoft },
  newProject: { backgroundColor: colors.text, borderRadius: 999, paddingVertical: 22, paddingHorizontal: 36 },
  newProjectText: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.lg, color: colors.white },
  ticker: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', backgroundColor: colors.text, paddingVertical: 12, paddingHorizontal: spacing[5] },
  tickerText: { fontFamily: fonts.bodyMedium, fontSize: fontSizes.sm, color: colors.white },
  tickerDot: { width: 7, height: 7, backgroundColor: colors.accent, transform: [{ rotate: '45deg' }], marginHorizontal: spacing[5] },
  progress: { height: 2, backgroundColor: colors.border, marginTop: spacing[4], width: '100%' },
  progressFill: { height: 2, backgroundColor: colors.text },
  slideTitle: { fontFamily: fonts.bodyBold, fontSize: fontSizes.base, color: colors.text },
  slideTags: { fontFamily: fonts.body, fontSize: fontSizes.xs, color: colors.textMuted, marginTop: 2 },
  counter: { fontFamily: fonts.bodyMedium, fontSize: fontSizes.sm, color: colors.text, marginHorizontal: spacing[2] },

  // intro and stats
  intro: { fontFamily: fonts.bodyMedium, fontSize: 24, lineHeight: 34, color: colors.text, maxWidth: 560 },
  introLink: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.lg, color: colors.accentDark },
  statValue: { fontFamily: fonts.heading, letterSpacing: -4, color: colors.white },
  statLine: { height: 1, backgroundColor: colors.white, marginVertical: spacing[5], opacity: 0.3 },
  statLabel: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes['2xl'], lineHeight: 32, letterSpacing: -0.5, color: colors.white, maxWidth: 320 },

  // meet janet
  sectionTitle: { fontFamily: fonts.heading, fontSize: 44, lineHeight: 50, letterSpacing: -1.5, color: colors.text, marginBottom: spacing[5] },

  // case studies
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -10 },
  num: { width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: colors.text, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  numText: { fontFamily: fonts.bodySemiBold, fontSize: 9, color: colors.text },
  projectTitle: { fontFamily: fonts.bodyBold, fontSize: fontSizes.sm, color: colors.text },
  projectTags: { fontFamily: fonts.body, fontSize: fontSizes.xs, lineHeight: 17, color: colors.textMuted, marginTop: 2 },

  // contact
  contactTitle: { fontFamily: fonts.heading, fontSize: 40, lineHeight: 46, letterSpacing: -1.5, color: colors.text, maxWidth: 900, alignSelf: 'center' },
  line: { fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.text, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.text, backgroundColor: 'transparent' },
  chipLabel: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.base, color: colors.text, marginBottom: spacing[3] },
  pill: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingVertical: 9, paddingHorizontal: spacing[4], margin: 4, backgroundColor: colors.surfaceHigh },
  pillOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  pillText: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.xs, color: colors.textSoft },
  sendWrap: { width: 160, height: 160, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: spacing[6] },
  sendShape: { position: 'absolute', width: 104, height: 104, borderRadius: 24, backgroundColor: colors.accent, transform: [{ rotate: '45deg' }] },
  sendText: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.lg, color: colors.onAccent },
  done: { alignItems: 'center', paddingVertical: spacing[12], maxWidth: 480, alignSelf: 'center' },

  // quote
  quoteText: { fontFamily: fonts.heading, letterSpacing: -3, color: colors.text, maxWidth: 1100, marginTop: spacing[4] },

  // clients
  clientName: { fontFamily: fonts.heading, fontSize: fontSizes['2xl'], letterSpacing: -0.5, color: colors.textMuted },

  // services
  groupRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: spacing[2] },
  groupNum: { fontFamily: fonts.body, fontSize: fontSizes.xs, color: colors.textMuted, width: 36, marginTop: 10 },
  groupTitle: { flex: 1, fontFamily: fonts.heading, fontSize: 48, lineHeight: 56, letterSpacing: -1.5, color: colors.text },
  groupOff: { color: colors.textMuted, opacity: 0.5 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4, marginBottom: spacing[5] },
  tag: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingVertical: 6, paddingHorizontal: spacing[3], margin: 4, backgroundColor: colors.surfaceHigh },
  tagText: { fontFamily: fonts.bodyMedium, fontSize: fontSizes.xs, color: colors.text },
  groupText: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 23, color: colors.textSoft, marginBottom: spacing[4], maxWidth: 520 },

  // rows (why, process, client words)
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingVertical: spacing[5], borderBottomWidth: 1, borderBottomColor: colors.border },
  rowTitle: { fontFamily: fonts.bodySemiBold, fontSize: fontSizes.base, lineHeight: 24, color: colors.text },
  rowTitleBig: { fontFamily: fonts.bodyMedium, fontSize: fontSizes.xl, lineHeight: 30 },
  rowText: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 22, color: colors.textMuted, marginTop: 4, maxWidth: 640 },
  rowTag: { fontFamily: fonts.body, fontSize: fontSizes.xs, color: colors.textMuted, marginTop: 4 },

  // packages
  pack: { flex: 1, borderTopWidth: 1, borderTopColor: colors.text, paddingTop: spacing[5] },
  packTag: { fontFamily: fonts.bodyBold, fontSize: fontSizes.xs, color: colors.accentDark, marginBottom: spacing[2] },
  packName: { fontFamily: fonts.heading, fontSize: fontSizes['2xl'], lineHeight: 30, letterSpacing: -0.5, color: colors.text, marginBottom: spacing[2] },
  packBest: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 22, color: colors.textSoft, marginBottom: spacing[4] },
  price: { fontFamily: fonts.heading, fontSize: fontSizes['2xl'], letterSpacing: -0.5, color: colors.accentDark, marginBottom: spacing[5] },

  // faqs
  faqItem: { borderBottomWidth: 1, borderBottomColor: colors.border },
  faqHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing[5] },
  faqQ: { flex: 1, fontFamily: fonts.bodySemiBold, fontSize: fontSizes.lg, lineHeight: 26, color: colors.text, paddingRight: spacing[4] },
  faqA: { fontFamily: fonts.body, fontSize: fontSizes.sm, lineHeight: 24, color: colors.textSoft, paddingBottom: spacing[5], maxWidth: 720 },

  // closing call to action
  ctaText: { fontFamily: fonts.heading, fontSize: 48, lineHeight: 54, letterSpacing: -1.5, color: colors.white, maxWidth: 900 },
});

export default HomeScreen;