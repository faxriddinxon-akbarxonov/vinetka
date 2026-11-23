import type { CSSProperties } from "react";
import type { ThemeId } from "./types";

export interface ThemePreset {
  id: ThemeId;
  name: string;
  note: string;
  light: boolean;
  swatch: [string, string, string];
  vars: Record<string, string>;
}

export const THEMES: Record<ThemeId, ThemePreset> = {
  oltin: {
    id: "oltin",
    name: "Oltin kun",
    note: "Kechqurun, iliq oltin yorug‘lik — eng ko‘p tanlanadigan dizayn.",
    light: false,
    swatch: ["#0B0B0D", "#D9B97B", "#F6F0E4"],
    vars: {
      "--v-bg": "#0B0B0D",
      "--v-surface": "#141417",
      "--v-ink": "#F6F0E4",
      "--v-muted": "#A79C88",
      "--v-accent": "#D9B97B",
      "--v-accent-deep": "#B08D4F",
      "--v-line": "rgba(246,240,228,0.14)",
    },
  },
  tong: {
    id: "tong",
    name: "Tong",
    note: "Yorug‘, qog‘ozga bosilgan albom kabi — maktab va ota-onalar uchun.",
    light: true,
    swatch: ["#F7F1E7", "#A9803F", "#1D1B17"],
    vars: {
      "--v-bg": "#F7F1E7",
      "--v-surface": "#FFFCF6",
      "--v-ink": "#1D1B17",
      "--v-muted": "#6F6859",
      "--v-accent": "#A9803F",
      "--v-accent-deep": "#8A672F",
      "--v-line": "rgba(29,27,23,0.14)",
    },
  },
  yulduz: {
    id: "yulduz",
    name: "Yulduzlar",
    note: "Tungi osmon va kumush — zamonaviy, kinematik kayfiyat.",
    light: false,
    swatch: ["#070C16", "#B9CFEA", "#E9EFF8"],
    vars: {
      "--v-bg": "#070C16",
      "--v-surface": "#0E1727",
      "--v-ink": "#E9EFF8",
      "--v-muted": "#8695AB",
      "--v-accent": "#B9CFEA",
      "--v-accent-deep": "#7FA3CC",
      "--v-line": "rgba(233,239,248,0.14)",
    },
  },
  shaftoli: {
    id: "shaftoli",
    name: "Shaftoli",
    note: "Issiq, samimiy terrakota — qizlar sinfi va ijodiy maktablar uchun.",
    light: true,
    swatch: ["#FBF0E7", "#C1683F", "#2B1D16"],
    vars: {
      "--v-bg": "#FBF0E7",
      "--v-surface": "#FFF8F2",
      "--v-ink": "#2B1D16",
      "--v-muted": "#7C6457",
      "--v-accent": "#C1683F",
      "--v-accent-deep": "#9C4E2C",
      "--v-line": "rgba(43,29,22,0.14)",
    },
  },
};

export const THEME_LIST = Object.values(THEMES);

export const DEFAULT_THEME: ThemeId = "oltin";

export function themeStyle(theme: ThemeId | undefined): CSSProperties {
  const preset = THEMES[theme ?? DEFAULT_THEME] ?? THEMES.oltin;
  return preset.vars as CSSProperties;
}

export function isLightTheme(theme: ThemeId | undefined) {
  return Boolean(THEMES[theme ?? DEFAULT_THEME]?.light);
}
