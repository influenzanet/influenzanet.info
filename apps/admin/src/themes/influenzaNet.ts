import type { ThemeConfig } from 'adminjs';
import type { ThemeOverride } from '@adminjs/design-system';
import { dark, light } from '@adminjs/themes';

const colorMain = '#003556';
// const colorAccent = '#00AB9F';
// const colorAccent = '#008a80';
// const colorAccent = '#008a89';
const colorAccent = '#00898a';
const colorBase = '#404040';
const colorBaseLight = '#FCFCFC';
const colorBaseAccent = '#F0F3F6';
const colorBaseAccentDark = '#979d9d';

export const influenzaNet: ThemeConfig = {
  id: 'InfluenzaNet',
  name: 'InfluenzaNet',
  overrides: {
    colors: {
      primary100: colorAccent,
      bg: colorBaseAccent,
      accent: colorMain,
      // text: colorBase,
    },
  } as ThemeOverride
};
