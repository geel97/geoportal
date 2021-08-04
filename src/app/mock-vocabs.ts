import { Locale } from 'locale';
import { Vocab } from './vocab';
export var VOCABS: Vocab[] = [
  {
    id: 'ALATZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Latitude north',
      },
      {
        locale: new Locale('it'),
        name: 'Latitudine nord',
      },
    ],
    measurementUnit: '°',
  },
  {
    id: 'ALKYZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Alkalinity',
      },
      {
        locale: new Locale('it'),
        name: 'Alcalinità',
      },
    ],
    measurementUnit: 'µEquiv/l',
  },
];
