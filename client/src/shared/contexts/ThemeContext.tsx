
import createContextHook from '@nkzw/create-context-hook';
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';


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