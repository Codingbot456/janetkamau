// anchors.js
import { Platform } from 'react-native';
import { layout } from '../../../styles/globalStyles';

// Find React Native Web's actual scroll container:
// the first ancestor with overflowY:auto/scroll whose content overflows.
const findScroller = (el) => {
  let node = el.parentElement;
  while (node && node !== document.body) {
    const st = window.getComputedStyle(node);
    const isAuto = st.overflowY === 'auto' || st.overflowY === 'scroll';
    const overflows = node.scrollHeight > node.clientHeight + 1;
    if (isAuto && overflows) return node;
    node = node.parentElement;
  }
  return null;
};

export const scrollToAnchor = (id) => {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  // 1. Find the element
  const el =
    document.getElementById(id) ||
    document.querySelector(`[data-id="${id}"]`);

  if (!el) return;

  // 2. Find the scroll container
  const sc = findScroller(el);
  if (!sc) return;

  // 3. Compute the target scrollTop
  const navOffset = layout?.navHeight ?? 80;
  const scRect = sc.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const delta = elRect.top - scRect.top;
  const target = Math.max(0, sc.scrollTop + delta - navOffset);

  // 4. Scroll (direct assignment — bypasses scrollTo)
  sc.scrollTop = target;
};