import { Language } from '../types';
import { TranslationType } from '../locales/en';

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
}
