export const colors = {
  green600: '#16A34A',
  green500: '#22C55E',
  green100: '#DCFCE7',
  amber500: '#F59E0B',
  amber100: '#FEF3C7',
  red500: '#EF4444',
  red100: '#FEE2E2',
  red200: '#FECACA',
  sky500: '#0EA5E9',
  sky100: '#E0F2FE',
  stone50: '#FAFAF9',
  stone100: '#F5F5F4',
  stone400: '#A8A29E',
  stone800: '#292524',
  stone900: '#1C1917',
  stone950: '#0C0A09',
  white: '#FFFFFF'
};

export function getThemeColors(isDark) {
  return {
    bg: isDark ? colors.stone950 : colors.stone50,
    card: isDark ? colors.stone900 : colors.white,
    text: isDark ? colors.stone100 : colors.stone800,
    textSecondary: colors.stone400,
    green: isDark ? colors.green500 : colors.green600,
    border: isDark ? '#2D2A26' : '#E7E5E4'
  };
}
