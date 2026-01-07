// theme/colors.ts

// 🎨 Core color palette
export const colors = {
  background: "#F9FAFB",
  surface: "#FFFFFF",
  textPrimary: "#111827",
  textSecondary: "#485563",
  primary: "#7C3AED",       // main brand purple
  accent: "#2563EB",        // blue
  destructive: "#DC2626",   // red
  muted: "#9CA3AF",         // gray tone
  border: "#E5E7EB",
  black: "#000000",
  white: "#FFFFFF",
};

// 🌈 Brand gradients (for buttons, banners, cards)
export const gradients = {
  purple: ["#8B5CF6", "#7C3AED"] as const,
  blue: ["#3B82F6", "#06B6D4"] as const,
  orange: ["#F97316", "#F59E0B"] as const,
  pink: ["#EC4899", "#F472B6"] as const,
  green: ["#22C55E", "#16A34A"] as const,
  red: ["#F87171", "#DC2626"] as const,
};


// 🌗 Light and Dark themes
export const themes = {
  light: {
    background: colors.background,
    surface: colors.surface,
    text: colors.textPrimary,
    tint: colors.primary,
    border: colors.border,
  },
  dark: {
    background: "#111827",
    surface: "#1F2937",
    text: "#F9FAFB",
    tint: "#A78BFA",
    border: "#374151",
  },
};
