export const SERIF_FONTS = [
  { value: 'prata', label: 'Prata' },
  { value: 'playfair-display', label: 'Playfair Display' },
  { value: 'cormorant-garamond', label: 'Cormorant Garamond' },
  { value: 'lora', label: 'Lora' },
  { value: 'dm-serif-display', label: 'DM Serif Display' },
  { value: 'libre-baskerville', label: 'Libre Baskerville' },
] as const

export const SANS_FONTS = [
  { value: 'inter', label: 'Inter' },
  { value: 'work-sans', label: 'Work Sans' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'raleway', label: 'Raleway' },
  { value: 'nunito-sans', label: 'Nunito Sans' },
  { value: 'source-sans-3', label: 'Source Sans 3' },
] as const

export const ALL_FONTS = [...SERIF_FONTS, ...SANS_FONTS]

// Map font value to CSS variable name
export function fontCssVar(fontValue: string): string {
  return `var(--font-${fontValue})`
}
