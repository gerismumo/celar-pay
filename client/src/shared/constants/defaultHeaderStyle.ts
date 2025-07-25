export const getDefaultHeaderStyle = (isDark: boolean, colors: any) => ({
  backgroundColor: colors.current.background,
  borderBottomColor: isDark ? colors.gray[800] : colors.border,
  borderBottomWidth: 1,
  elevation: 0,
});
