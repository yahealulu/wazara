import { useLocalization } from '../contexts/LocalizationContext';
import { translations } from '../localization/translations';
import type { Translations } from '../localization/translations';

export const useTranslation = (): Translations => {
  const { language } = useLocalization();
  return translations[language];
};