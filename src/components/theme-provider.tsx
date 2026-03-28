"use client";

import { fontCssVar } from "@/lib/fonts";

interface ColorValue {
  hex?: string;
}

interface Settings {
  couleurs?: {
    primary?: ColorValue;
    primaryLight?: ColorValue;
    secondary?: ColorValue;
    cream?: ColorValue;
    accent?: ColorValue;
    surface?: ColorValue;
    text?: ColorValue;
    textMuted?: ColorValue;
  } | null;
  typographie?: {
    headingFont?: string;
    bodyFont?: string;
    baseSize?: number;
    headingWeight?: string;
  } | null;
}

export default function ThemeProvider({
  settings,
  children,
}: {
  settings: Settings | null;
  children: React.ReactNode;
}) {
  const c = settings?.couleurs;
  const t = settings?.typographie;

  const cssVars: Record<string, string> = {};

  // Colors
  if (c?.primary?.hex) cssVars["--color-primary"] = c.primary.hex;
  if (c?.primaryLight?.hex) cssVars["--color-primary-light"] = c.primaryLight.hex;
  if (c?.secondary?.hex) {
    cssVars["--color-secondary"] = c.secondary.hex;
    cssVars["--color-charcoal"] = c.secondary.hex;
  }
  if (c?.cream?.hex) cssVars["--color-cream"] = c.cream.hex;
  if (c?.accent?.hex) cssVars["--color-accent"] = c.accent.hex;
  if (c?.surface?.hex) cssVars["--color-surface"] = c.surface.hex;
  if (c?.text?.hex) cssVars["--color-text"] = c.text.hex;
  if (c?.textMuted?.hex) cssVars["--color-text-muted"] = c.textMuted.hex;

  // Typography
  if (t?.headingFont) cssVars["--font-serif"] = fontCssVar(t.headingFont);
  if (t?.bodyFont) cssVars["--font-sans"] = fontCssVar(t.bodyFont);
  if (t?.baseSize) cssVars["--text-base-size"] = `${t.baseSize}px`;
  if (t?.headingWeight) cssVars["--heading-weight"] = t.headingWeight;

  return (
    <div style={cssVars} className="contents">
      {children}
    </div>
  );
}
