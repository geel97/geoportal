import { Locale } from 'locale';
export interface Vocab {
  id: string;
  measurementName: { locale: Locale; name: string }[];
  measurementUnit: string;
}
