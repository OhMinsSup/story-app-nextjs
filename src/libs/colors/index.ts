import { COLORS } from './constants';

export function getOpenColorHex() {
  const colorWrap = document.querySelector('.color-wrap');
  if (!colorWrap?.children.length) {
    return;
  }

  let colorMap = {};
  for (const child of colorWrap.children) {
    const colorChips = child.querySelectorAll('.color-chip');
    let color = {};
    colorChips.forEach((chip) => {
      color = {
        ...color,
        [chip.id]: chip.querySelector('.color-hex')?.getAttribute('value'),
      };
    });
    colorMap = {
      ...colorMap,
      [child.id]: color,
    };
  }
  return colorMap;
}

export const getColorHex = () => {
  return Object.entries(COLORS)
    .map(([_, value]) => value)
    .flatMap((value) =>
      Object.entries(value).map(([key, value]) => ({ key, value })),
    );
};
