// common/ui/Reveal.js - scroll-reveal animations (DD.NYC style), web only.
//   <Reveal delay={100}>...</Reveal>   fades up once, when it scrolls into view
//   <ScrollFillText text="..." />      words fill from grey to dark as you scroll past
//   <TypeWriter prefix="..." words={[...]} />   small typing line that cycles through words
// On phones/native apps, with reduced-motion turned on, or without IntersectionObserver,
// everything simply shows normally with no animation.
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Text, View } from 'react-native';
import { colors } from '../../../styles/globalStyles';

let uid = 0;
const useUid = (prefix) => {
  const ref = useRef(null);
  if (ref.current === null) { uid += 1; ref.current = `${prefix}-${uid}`; }
  return ref.current;
};

const prefersReducedMotion = () =>
  Platform.OS === 'web' && typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const canAnimate = () =>
  Platform.OS === 'web' && typeof window !== 'undefined' && typeof IntersectionObserver !== 'undefined' && !prefersReducedMotion();

// ---------------- Fade up when scrolled into view (plays once) ----------------
const Reveal = ({ children, delay = 0, distance = 36, duration = 700, style }) => {
  const animate = canAnimate();
  const id = useUid('reveal');
  const progress = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const played = useRef(false);

  useEffect(() => {
    if (!animate) return undefined;
    const el = document.getElementById(id);
    if (!el) { progress.setValue(1); return undefined; }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            Animated.timing(progress, { toValue: 1, duration, delay, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View
      nativeID={id}
      style={[style, { opacity: progress, transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }] }]}
    >
      {children}
    </Animated.View>
  );
};

// ---------------- Words fill in as you scroll (the big quote) ----------------
export const ScrollFillText = ({ text, style }) => {
  const words = text.split(' ');
  const animate = canAnimate();
  const id = useUid('fill');
  const [filled, setFilled] = useState(animate ? 0 : words.length);

  useEffect(() => {
    if (!animate) return undefined;
    const el = document.getElementById(id);
    if (!el) { setFilled(words.length); return undefined; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const start = vh * 0.9;   // progress 0: the top of the text reaches the lower part of the screen
      const end = vh * 0.5;     // progress 1: the bottom of the text reaches the middle of the screen
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      const n = Math.round(p * words.length);
      setFilled((prev) => (prev === n ? prev : n));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    // capture: true also catches scrolling inside a ScrollView, not only the window
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  const fade = Platform.OS === 'web' ? { transitionProperty: 'color', transitionDuration: '250ms' } : null;
  return (
    <Text nativeID={id} style={style} accessibilityLabel={text}>
      {words.map((w, i) => (
        <Text key={i} style={[{ color: i < filled ? colors.text : colors.border }, fade]}>
          {w}{i < words.length - 1 ? ' ' : ''}
        </Text>
      ))}
    </Text>
  );
};

// ---------------- Small typing line: "Hi, I'm Janet. I design logos." (cycles through the words) ----------------
export const TypeWriter = ({ prefix = '', words = [], style, wordStyle, typeSpeed = 70, deleteSpeed = 35, hold = 1500 }) => {
  const reduced = prefersReducedMotion();
  const [text, setText] = useState(reduced ? (words[0] || '') : '');
  const blink = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (reduced || !words.length) return undefined;
    let i = 0;
    let n = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const word = words[i];
      if (!deleting) {
        n += 1;
        setText(word.slice(0, n));
        if (n === word.length) { deleting = true; timer = setTimeout(tick, hold); return; }
        timer = setTimeout(tick, typeSpeed);
      } else {
        n -= 1;
        setText(word.slice(0, n));
        if (n === 0) { deleting = false; i = (i + 1) % words.length; timer = setTimeout(tick, 350); return; }
        timer = setTimeout(tick, deleteSpeed);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [reduced, words.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reduced) return undefined;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0, duration: 450, useNativeDriver: false }),
        Animated.timing(blink, { toValue: 1, duration: 450, useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View accessible accessibilityLabel={prefix + words.join(', ')} style={{ flexDirection: 'row', alignItems: 'center', minHeight: 28 }}>
      <Text style={[style, { flexShrink: 1 }]}>{prefix}<Text style={wordStyle}>{text}</Text></Text>
      {!reduced ? <Animated.View style={{ width: 2, height: 20, marginLeft: 2, backgroundColor: colors.accent, opacity: blink }} /> : null}
    </View>
  );
};

export default Reveal;