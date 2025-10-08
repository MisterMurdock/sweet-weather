import { useSettings } from '@/app/contexts/SettingsContext';

export function useColorScheme() {
  const { effectiveTheme } = useSettings();
  return effectiveTheme;
}