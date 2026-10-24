import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Linking, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import PageLayout from '../../navigation/layout/web/PageLayout';
import { SITE } from '../../navigation/childNav/webNav/siteConfig';
import { PillButton } from '../../common/ui/sections';
import { globalStyles as g, colors, fonts, fontSizes, spacing, layout, borderRadius, shadows, placeholderTextColor } from '../../../styles/globalStyles';
import { CONTACT } from './content/contactContent';

// Dropdown: a button that shows the choice, and a list that opens under it.
const Select = ({ label, value, options, placeholder, open, onToggle, onPick }) => (
  <View>
    <Pressable onPress={onToggle} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ expanded: open }} style={s.select}>
      <Text style={[s.selectText, !value && { color: colors.placeholder }]} numberOfLines={1}>{value || placeholder}</Text>
      <Icon name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color={colors.heading} />
    </Pressable>
    {open ? (
      <View style={s.menu}>
        <ScrollView style={{ maxHeight: 240 }} nestedScrollEnabled>
          {options.map((o) => (
            <Pressable key={o} onPress={() => onPick(o)} accessibilityRole="button" style={({ hovered }) => [s.option, hovered && { backgroundColor: colors.bar }]}>
              <Text style={[s.optionText, o === value && { fontFamily: fonts.navSemiBold }]}>{o}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    ) : null}
  </View>
);

const ContactForm = ({ form, phone, initialTopic }) => {
  const [values, setValues] = useState({ topic: form.topics.includes(initialTopic) ? initialTopic : '' });
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState(null);
  const [openKey, setOpenKey] = useState(null);
  const [sent, setSent] = useState(false);

  const set = (k, v) => { setValues((x) => ({ ...x, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: null })); };

  const submit = () => {
    const next = {};
    form.fields.forEach((f) => { if (f.required && !(values[f.key] || '').trim()) next[f.key] = 'This field is required'; });
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Enter a valid email address';
    setErrors(next);
    if (Object.keys(next).length) return;
    // TODO: send `values` to your backend / email service / Google Sheet here.
    setSent(true);
  };

  if (sent) {
    return (
      <View style={s.done} accessibilityLiveRegion="polite">
        <Icon name="check-circle" size={44} color={colors.secondary} />
        <Text style={[g.text, g.textCenter, { marginTop: spacing[4] }]}>{form.success}</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -8 }}>
        {form.fields.map((f) => (
          // A cell with an open dropdown rises above the fields below it
          <View key={f.key} style={{ width: f.half && !phone ? '50%' : '100%', padding: 8, zIndex: openKey === f.key ? 20 : 1 }}>
            <Text style={s.label}>{f.label}{f.required ? ' *' : ''}</Text>
            {f.type === 'select' ? (
              <Select
                label={f.label}
                value={values[f.key]}
                options={form[f.optionsKey]}
                placeholder={form.selectPlaceholder}
                open={openKey === f.key}
                onToggle={() => setOpenKey(openKey === f.key ? null : f.key)}
                onPick={(o) => { set(f.key, o); setOpenKey(null); }}
              />
            ) : (
              <TextInput
                value={values[f.key] || ''}
                onChangeText={(v) => set(f.key, v)}
                onFocus={() => { setFocus(f.key); setOpenKey(null); }}
                onBlur={() => setFocus(null)}
                keyboardType={f.keyboard}
                multiline={f.multiline}
                placeholder={f.label}
                placeholderTextColor={placeholderTextColor}
                accessibilityLabel={f.label}
                style={[s.input, f.multiline && { minHeight: 140, textAlignVertical: 'top' }, focus === f.key && s.inputFocus, errors[f.key] && { borderColor: colors.danger }]}
              />
            )}
            {errors[f.key] ? <Text style={[g.error, { marginTop: 4 }]}>{errors[f.key]}</Text> : null}
          </View>
        ))}
      </View>
      <View style={{ alignItems: 'flex-end', padding: 8, marginTop: spacing[2] }}>
        <PillButton label={form.submit} variant="blue" icon={null} onPress={submit} />
      </View>
      <Text style={[g.textMuted, { padding: 8 }]}>{form.note}</Text>
    </View>
  );
};

// Plain page, like the model: solid blue header, text on the left, form card on the right.
const ContactScreen = () => {
  const route = useRoute();
  const { width } = useWindowDimensions();
  const compact = width < layout.desktop;
  const phone = width < layout.tablet;
  const { title, paragraphs, consultation, details, form } = CONTACT;

  const site = SITE || {};
  const tel = (site.phones && site.phones[0]) || '';
  const open = (url) => { if (url) Linking.openURL(url); };
  const waUrl = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(consultation.message)}` : null;
  const consult = () => open(waUrl);

  return (
    <PageLayout headerColor={colors.secondary}>
      <View style={[g.container, { paddingTop: spacing[16], paddingBottom: spacing[16] }]}>
        <View style={{ flexDirection: compact ? 'column' : 'row', alignItems: 'flex-start' }}>
          {/* Left: words and details */}
          <View style={{ flex: compact ? undefined : 1, width: compact ? '100%' : undefined, paddingRight: compact ? 0 : spacing[12], marginBottom: compact ? spacing[10] : 0 }}>
            <Text style={[s.title, phone && { fontSize: 40, lineHeight: 50 }]} accessibilityRole="header">{title}</Text>
            {paragraphs.map((p) => <Text key={p} style={s.p}>{p}</Text>)}
            {waUrl ? <View style={{ marginVertical: spacing[4] }}><PillButton label={consultation.label} icon="chat" onPress={consult} /></View> : null}

            <Text style={[s.p, { fontFamily: fonts.navSemiBold, marginTop: spacing[6] }]}>{details.name}</Text>
            {site.addressLines && site.addressLines.length ? <Text style={s.line}>{site.addressLines.join(', ')}</Text> : null}
            {site.email ? (
              <Text style={s.line}>{details.labels.email}: <Text style={s.link} onPress={() => open('mailto:' + site.email)} accessibilityRole="link">{site.email}</Text></Text>
            ) : null}
            {tel ? (
              <Text style={s.line}>{details.labels.telephone || details.labels.phone}: <Text style={s.link} onPress={() => open('tel:' + tel.replace(/\s/g, ''))} accessibilityRole="link">{tel}</Text></Text>
            ) : null}
            {waUrl ? (
              <Text style={s.line}>{details.labels.whatsapp}: <Text style={s.link} onPress={() => open(waUrl)} accessibilityRole="link">{details.whatsappText}</Text></Text>
            ) : null}
            <Text style={[s.line, { color: colors.muted, marginTop: spacing[3] }]}>{details.hours}</Text>
          </View>

          {/* Right: form card */}
          <View style={[s.card, { flex: compact ? undefined : 1.1, width: compact ? '100%' : undefined }]}>
            <Text style={s.cardTitle}>{form.title}</Text>
            <ContactForm form={form} phone={phone} initialTopic={route && route.params && route.params.topic} />
          </View>
        </View>
      </View>
    </PageLayout>
  );
};

const s = StyleSheet.create({
  title: { fontFamily: fonts.heading, fontSize: 56, lineHeight: 68, color: colors.heading, marginBottom: spacing[8] },
  p: { fontFamily: fonts.body, fontSize: fontSizes.lg, lineHeight: 30, color: colors.ink, marginBottom: spacing[5], maxWidth: 560 },
  line: { fontFamily: fonts.body, fontSize: fontSizes.base, lineHeight: 28, color: colors.ink },
  link: { textDecorationLine: 'underline', color: colors.ink },

  card: { backgroundColor: colors.sky, borderRadius: borderRadius.lg, padding: spacing[8] },
  cardTitle: { fontFamily: fonts.navMedium, fontSize: 28, lineHeight: 36, color: colors.heading, marginBottom: spacing[5], paddingHorizontal: 8 },
  label: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.heading, marginBottom: spacing[2] },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.white, borderRadius: borderRadius.sm, paddingVertical: 14, paddingHorizontal: spacing[4], fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.ink },
  inputFocus: { borderColor: colors.secondary },
  select: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.white, borderRadius: borderRadius.sm, paddingVertical: 14, paddingHorizontal: spacing[4], minHeight: 52 },
  selectText: { flex: 1, fontFamily: fonts.body, fontSize: fontSizes.base, color: colors.ink, paddingRight: spacing[2] },
  menu: { position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, backgroundColor: colors.white, borderRadius: borderRadius.sm, overflow: 'hidden', ...shadows.dropdown },
  option: { paddingVertical: 12, paddingHorizontal: spacing[4] },
  optionText: { fontFamily: fonts.body, fontSize: fontSizes.sm, color: colors.ink },
  done: { alignItems: 'center', paddingVertical: spacing[12], maxWidth: 520, alignSelf: 'center' },
});

export default ContactScreen;