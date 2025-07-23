import { Colors } from '@/constants/Colors';
import createContextHook from '@nkzw/create-context-hook';
import { useColorScheme } from 'react-native';


export const [ThemeProvider, useTheme] = createContextHook(() => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const colors = {
    ...Colors,
    current: isDark ? Colors.dark : Colors.light,
  };
  
  return {
    colors,
    isDark,
    colorScheme,
  };
});