import { Injectable } from '@angular/core';
import { VOCABS } from './mock-vocabs';

@Injectable({
  providedIn: 'root',
})
export class VocabService {
  defaultLocale = 'en';

  constructor() {}

  getMeasurementName(id: string, locale: string = this.defaultLocale): string | undefined {
    let measurementName = VOCABS.find(x => x.id == id)?.measurementName;
    if (measurementName?.find(y => y.locale == locale) === undefined)
      return measurementName?.find(y => y.locale == this.defaultLocale)?.name;
    else return measurementName.find(y => y.locale == locale)?.name;
  }

  getMeasurementUnit(id: string): string | undefined {
    return VOCABS.find(x => x.id == id)?.measurementUnit;
  }
}
