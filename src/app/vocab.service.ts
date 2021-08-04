import { Injectable } from '@angular/core';
import { Locale } from 'locale';
import { VOCABS } from './mock-vocabs';

@Injectable({
  providedIn: 'root',
})
export class VocabService {
  defaultLocale = new Locale('en');

  constructor() {}

  getMeasurementName(id: string, locale: Locale = this.defaultLocale): string | undefined {
    let measurementName = VOCABS.find(x => x.id == id)?.measurementName;
    if (measurementName?.find(y => y.locale == locale) === undefined)
      return measurementName?.find(y => y.locale == this.defaultLocale)?.name;
    else return measurementName.find(y => y.locale == locale)?.name;
  }

  getMeasurementUnit(id: string): string | undefined {
    return VOCABS.find(x => x.id == id)?.measurementUnit;
  }
}
