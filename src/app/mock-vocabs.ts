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
  {
    id: 'ALONZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Longitude east',
      },
      {
        locale: new Locale('it'),
        name: 'Longitudine est',
      },
    ],
    measurementUnit: '°',
  },
  {
    id: 'AMONZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Ammonium',
      },
      {
        locale: new Locale('it'),
        name: 'Ammonio',
      },
    ],
    measurementUnit: 'umol/l',
  },
  {
    id: 'ASLVZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Surface elevation',
      },
      {
        locale: new Locale('it'),
        name: 'Elevazine della superficie',
      },
    ],
    measurementUnit: 'm',
  },
  
  {
    id: 'BLENOMCL',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Clausocalanus length',
      },
      {
        locale: new Locale('it'),
        name: 'Lunghezza Clausocalanus',
      },
    ],
    measurementUnit: 'mm',
  },
  {
    id: 'CAPAZZ01', /* Da guardare CAPHZZ01 */
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Pressure(correction to sea level)',
      },
      {
        locale: new Locale('it'),
        name: 'Pressione(correzione al livello del mare)',
      },
    ],
    measurementUnit: 'mBar',
  },
  {
    id: 'CPHLZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'chlorophyll-a',
      },
      {
        locale: new Locale('it'),
        name: 'Clorofilla',
      },
    ],
    measurementUnit: 'mg/m³',
  },
  {
    id: 'CRELZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Humidity',
      },
      {
        locale: new Locale('it'),
        name: 'Umidità',
      },
    ],
    measurementUnit: '%',
  },
  {
    id: 'CTMPZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Atmospheric temperature ',
      },
      {
        locale: new Locale('it'),
        name: 'Temperatura atmosferica',
      },
    ],
    measurementUnit: '°C',
  },
  {
    id: 'DOXYZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Oxygen(per unit volume)',
      },
      {
        locale: new Locale('it'),
        name: 'Ossigeno(per unità di volume)',
      },
    ],
    measurementUnit: 'umol/l',
  },
  {
    id: 'EGTDZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Wind Direction(gust)',
      },
      {
        locale: new Locale('it'),
        name: 'Direzione del vento(raffica)',
      },
    ],
    measurementUnit: '°T',
  },
  {
    id: 'EGTSZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Wind Speed(gust)',
      },
      {
        locale: new Locale('it'),
        name: 'Velocità del vento(raffica)',
      },
    ],
    measurementUnit: 'm/s',
  },
  {
    id: 'EWDAZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Wind direction',
      },
      {
        locale: new Locale('it'),
        name: 'Direzione vento',
      },
    ],
    measurementUnit: '°T',
  },
  {
    id: 'EWSBZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Wind speed',
      },
      {
        locale: new Locale('it'),
        name: 'Velocità del vento',
      },
    ],
    measurementUnit: 'm/s',
  },
  {
    id: 'F046GCP1',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Carbon concentration in water',
      },
      {
        locale: new Locale('it'),
        name: 'Concentrazione di carbonio in acqua',
      },
    ],
    measurementUnit: 'nmol/l',
  },
  {
    id: 'GAVHZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Average height of waves(1/3)',
      },
      {
        locale: new Locale('it'),
        name: 'Altezza media delle onde(1/3)',
      },
    ],
    measurementUnit: 'm',
  },
  {
    id: 'GPEDFA01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Mean direction of waves',
              /* Mean direction at spectral peak of waves */
      },
      {
        locale: new Locale('it'),
        name: 'Direzione media delle onde',
              /*Direzione media al picco spettrale delle onde*/
      },
    ],
    measurementUnit: '°T',
  },
  {
    id: 'GPSPFA01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Directional spreading of waves',
              /* Directional spreading at spectral peak of waves */
      },
      {
        locale: new Locale('it'),
        name: 'Direzione delle diffusione delle onde',
      },
    ],
    measurementUnit: '°',
  },
  {
    id: 'GSPKFA01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Spectral peakedness factor of waves',
      },
      {
        locale: new Locale('it'),
        name: 'Picco spettrale delle onde',
      },
    ],
    measurementUnit: '',
    /*Dimensionless*/
  },
  {
    id: 'GTCAZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Average crest period of waves',
      },
      {
        locale: new Locale('it'),
        name: 'Periodo medio di cresta delle onde',
      },
    ],
    measurementUnit: 's',
  },
  {
    id: 'GTDTZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Average height of waves(1/10)',
      },
      {
        locale: new Locale('it'),
        name: 'Altezza media delle onde(1/10)',
      },
    ],
    measurementUnit: 'm',
  },
  {
    id: 'GTPKZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Period at spectral maximum of waves',
      },
      {
        locale: new Locale('it'),
        name: 'Periodo al massimo spettrale delle onde',
      },
    ],
    measurementUnit: 's',
  },
  {
    id: 'GTZAZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Zero-crossing period of waves',
      },
      {
        locale: new Locale('it'),
        name: 'Periodo di zero-crossing delle onde',
      },
    ],
    measurementUnit: 's',
  },
  {
    id: 'GTZHZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Zero-crossing period of waves(1/3)',
              /*Zero-crossing period of waves (highest one third)*/
      },
      {
        locale: new Locale('it'),
        name: 'Periodo di zero-crossing delle onde(1/3)',
      },
    ],
    measurementUnit: 's',
  },
  {
    id: 'GTZMZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Maximum zero crossing period of waves',
      },
      {
        locale: new Locale('it'),
        name: 'Massimo periodo di zero-crossing delle onde',
      },
    ],
    measurementUnit: 's',
  },
  {
    id: 'GTZTVA01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Zero-crossing period of waves(1/10)',
        /*Zero-crossing period of waves (highest one tenth)*/
      },
      {
        locale: new Locale('it'),
        name: 'Periodo di zero-crossing delle onde(1/10)',
      },
    ],
    measurementUnit: 's',
  },
  {
    id: 'GZMXZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Maximum zero-crossing height of waves',
      },
      {
        locale: new Locale('it'),
        name: 'Massimo zero-crossing dell altezza delle onde',
      },
    ],
    measurementUnit: 'm',
  },
  {
    id: 'HDCBATH1',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Anthracene(biota)',
        /*Concentration of anthracene per unit wet weight of biota */
      },
      {
        locale: new Locale('it'),
        name: 'Antracene(biota)',
      },
    ],
    measurementUnit: 'µg/kg',
  },
  {
    id: 'HDCCZN01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Anthracene(sediment)',
        /*Concentration of anthracene per unit dry weight of sediment*/
      },
      {
        locale: new Locale('it'),
        name: 'Antracene(sedimento)',
      },
    ],
    measurementUnit: 'umol/kg',
  },
  {
    id: 'HEXOSDP1',
    measurementName: [
      {
        locale: new Locale('en'),
        name: "19'-hexanoyloxyfucoxanthin",
        /*Concentration standard deviation of 19'-hexanoyloxyfucoxanthin*/
      },
      {
        locale: new Locale('it'),
        name: "19'-hexanoyloxyfucoxanthin",
      },
    ],
    measurementUnit: 'ng/l',
  },
  {
    id: 'HMZEZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Spectral significant height of waves',
      },
      {
        locale: new Locale('it'),
        name: 'Altezza spettrale significativa delle onde',
      },
    ],
    measurementUnit: 'm',
  },
  {
    id: 'LCEWZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Eastward velocity of water current',
      },
      {
        locale: new Locale('it'),
        name: "Velocità verso est della corrente d'acqua",
      },
    ],
    measurementUnit: 'cm/s',
  },
  {
    id: 'LCNSZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Northward velocity of water current',
      },
      {
        locale: new Locale('it'),
        name: "Velocità verso nord della corrente d'acqua",
      },
    ],
    measurementUnit: 'cm/s',
  },
  {
    id: 'LRZAZZZZ',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Upward velocity of water current',
      },
      {
        locale: new Locale('it'),
        name: "Velocità ascendente della corrente d'acqua",
      },
    ],
    measurementUnit: 'cm/s',
  },
  {
    id: 'NTOTZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Nitrogen (water)',
      },
      {
        locale: new Locale('it'),
        name: 'Azoto (acqua)',
      },
    ],
    measurementUnit: 'umol/l',
  },
  {
    id: 'NTRAZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Nitrate (water)',
      },
      {
        locale: new Locale('it'),
        name: 'Nitrato (acqua)',
      },
    ],
    measurementUnit: 'umol/l',
  },
  {
    id: 'NTRIZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Nitrite (water)',
      },
      {
        locale: new Locale('it'),
        name: 'Nitrito (acqua)',
      },
    ],
    measurementUnit: 'umol/l',
  },
  {
    id: 'P170M00Z',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Elakatothrix',
              /*Abundance of Elakatothrix*/
      },
      {
        locale: new Locale('it'),
        name: 'Elakatothrix',
              /*Abbondaza/quantità of Elakatothrix*/
      },
    ],
    measurementUnit: '#/ml',
     /*Number per millilitre*/
  },
  {
    id: 'PHOSZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Phosphate (water)',
      },
      {
        locale: new Locale('it'),
        name: 'Fosfato (acqua)',
      },
    ],
    measurementUnit: 'umol/l',
  },
  {
    id: 'PHXXZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'pH',
      },
      {
        locale: new Locale('it'),
        name: 'pH',
      },
    ],
    measurementUnit: 'pH units',
                    /*Dimensionless oppure logaritmo da decidere*/
  },
  {
    id: 'PIGA638A',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Light absorbance (638nm wavelength)',
      },
      {
        locale: new Locale('it'),
        name: "Assorbimento della luce(lunghezza d'onda 638 nm)",
      },
    ],
    measurementUnit: '/m',
  },
  {
    id: 'PIGNA667',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Light absorbance (667nm wavelength)',
      },
      {
        locale: new Locale('it'),
        name: "Assorbimento della luce(lunghezza d'onda 667 nm)",
      },
    ],
    measurementUnit: '/m',
  },
  {
    id: 'PRESPR01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Pressure (zero at sea level)',
      },
      {
        locale: new Locale('it'),
        name: 'Pressione (zero al livello del mare)',
      },
    ],
    measurementUnit: 'dbar',
  },
  {
    id: 'PSLTZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Practical salinity',
      },
      {
        locale: new Locale('it'),
        name: 'Salinità',
      },
    ],
    measurementUnit: '',
     /*Dimensionless*/
  },
  {
    id: 'RFDSCH02',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Riverine discharge',
      },
      {
        locale: new Locale('it'),
        name: 'Scarico fluviale',
      },
    ],
    measurementUnit: 'm³/s',
  },
  {
    id: 'RPOTPRTX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: ' Redox potential in the sediment',
      },
      {
        locale: new Locale('it'),
        name: 'Potenziale redox nel sedimento',
        /*Ossidoriduzione*/
      },
    ],
    measurementUnit: 'mV',
  },
  {
    id: 'SLCAZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Silicate (water)',
      },
      {
        locale: new Locale('it'),
        name: 'Silicato (acqua)',
      },
    ],
    measurementUnit: 'umol/l',
  },
  {
    id: 'SNCURAAA',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Uptake rate of carbon',
              /*Uptake rate (hourly) of carbon*/
      },
      {
        locale: new Locale('it'),
        name: "Tasso di assorbimento di carbonio",
              /*Tasso di assorbimento (all'ora) di carbonio*/
      },
    ],
    measurementUnit: 'mg/m³/h',
  },
  {
    id: 'SWLA207A',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Light absorbance (207nm wavelength)',
      },
      {
        locale: new Locale('it'),
        name:  "Assorbimento della luce(lunghezza d'onda 207 nm)",
      },
    ],
    measurementUnit: '/m',
  },
  {
    id: 'TEMPPR01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Temperature of the water ',
      },
      {
        locale: new Locale('it'),
        name: "Temperatura dell'acqua",
      },
    ],
    measurementUnit: '°C',
  },
  {
    id: 'TPHSZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Phosphorus (water)',
      },
      {
        locale: new Locale('it'),
        name: 'Fosforo (acqua)',
      },
    ],
    measurementUnit: 'umol/l',
  },
  {
    id: 'ZBVV1084',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Opisthodonta pterochaeta',
      },
      {
        locale: new Locale('it'),
        name: 'Opisthodonta pterochaeta',
      },
    ],
    measurementUnit: 'g/m²',
  },
  {
    id: 'OXYSZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Saturation of oxygen (water)',
      },
      {
        locale: new Locale('it'),
        name: 'Saturazione di ossigeno (acqua)',
      },
    ],
    measurementUnit: '%',
  },
  {
    id: 'HEADCMMG',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Orientation',
      },
      {
        locale: new Locale('it'),
        name: 'Orientamento',
      },
    ],
    measurementUnit: '°',
  },
  {
    id: 'LCSAZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Speed of water current ',
      },
      {
        locale: new Locale('it'),
        name: "Velocità della corrente d'acqua",
      },
    ],
    measurementUnit: 'cm/s',
  },
  {
    id: 'LCDAZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Direction of water current',
      },
      {
        locale: new Locale('it'),
        name: "Direzione della corrente d'acqua",
      },
    ],
    measurementUnit: '°T',
  },
  {
    id: 'ASLVMSPG',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Surface elevation (Mean Sea Level datum) ',
      },
      {
        locale: new Locale('it'),
        name: 'Elevazine della superficie (livello medio del mare)',
      },
    ],
    measurementUnit: 'm',
  },
  {
    id: 'ADEPZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Depth of the sensor',
      },
      {
        locale: new Locale('it'),
        name: 'Profondità del sensore',
      },
    ],
    measurementUnit: 'm',
  },
  {
    id: 'PPSASF01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Depth of the pressure sensor',
      },
      {
        locale: new Locale('it'),
        name: 'Profondità del sensore di pressione',
      },
    ],
    measurementUnit: 'm',
  },
  {
    id: 'PPSBSF01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Depth of the pressure sensor(correction at zero)',
      },
      {
        locale: new Locale('it'),
        name: 'Profondità del sensore di pressione(correzzione al livello del mare)',
      },
    ],
    measurementUnit: 'm',
  },
  {
    id: 'CSLRZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Irradiance (solar wavelengths)',
      },
      {
        locale: new Locale('it'),
        name: 'Irradianza (onde solari)',
      },
    ],
    measurementUnit: 'W/m²',
  },
  {
    id: 'PCO2EG01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Carbon dioxide (IR gas analysis)',
      },
      {
        locale: new Locale('it'),
        name: 'Diossido di carbonio (IR gas analysis)',
      },
    ],
    measurementUnit: 'µatm',
  },
  {
    id: 'CDTAZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Temperature of the atmosphere(thermometer)',
              /*Air Temperature*/
      },
      {
        locale: new Locale('it'),
        name: "Temperature dell'aria(termometro)",
      },
    ],
    measurementUnit: '°C',
  },
  {
    id: 'CAPHZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Atmospheric pressure',
      },
      {
        locale: new Locale('it'),
        name: 'Pressione atmosferica',
      },
    ],
    measurementUnit: 'mBar',
  },
  {
    id: 'CDEWZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Dew point temperature',
      },
      {
        locale: new Locale('it'),
        name: 'Temperatura del punto di rugiada',
      },
    ],
    measurementUnit: '°C',
  },
  {
    id: 'CDTASS01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Air temperature (dry bulb thermometer)',
      },
      {
        locale: new Locale('it'),
        name: "Temperatura dell'aria (dry bulb thermometer)"
      },
    ],
    measurementUnit: '°C',
  },
  {
    id: 'CNDCZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Electrical conductivity of the water',
      },
      {
        locale: new Locale('it'),
        name: "Conducibilità elettrica dell'acqua",
      },
    ],
    measurementUnit: 'S/m',
  },
  {
    id: 'CPRPRG01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Thickness of precipitation ',
      },
      {
        locale: new Locale('it'),
        name: 'Spessore delle precipitazioni',
      },
    ],
    measurementUnit: 'mm',
  },
  {
    id: 'CPRRRG01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Precipitation rate',
      },
      {
        locale: new Locale('it'),
        name: 'Tasso di precipitazione',
      },
    ],
    measurementUnit: 'mm/min',
  },
  {
    id: 'DOXMZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'oxygen (per unit mass)',
      },
      {
        locale: new Locale('it'),
        name: 'Ossigeno (per unità di massa)',
      },
    ],
    measurementUnit: 'umol/kg',
  },
  {
    id: 'ESEWZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Eastward velocity of wind',
      },
      {
        locale: new Locale('it'),
        name: 'Velocità del vento verso est',
      },
    ],
    measurementUnit: 'm/s',
  },
  {
    id: 'ESNSZZXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Northward velocity of wind',
      },
      {
        locale: new Locale('it'),
        name: "Velocità del vento verso nord",
      },
    ],
    measurementUnit: 'm/s',
  },
  {
    id: 'FLUOZZZZ',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Fluorescence of the water',
      },
      {
        locale: new Locale('it'),
        name: "Fluorescenza dell'acqua",
      },
    ],
    measurementUnit: '',
  },
  {
    id: 'GTDHZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Significant wave height',
      },
      {
        locale: new Locale('it'),
        name: 'Altezza delle onde',
      },
    ],
    measurementUnit: 'm',
  },
  {
    id: 'GWDRZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Direction of waves',
      },
      {
        locale: new Locale('it'),
        name: 'Direzione delle onde',
      },
    ],
    measurementUnit: '°T',
  },
  {
    id: 'LWRDZZ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Irradiance (longwave) ',
      },
      {
        locale: new Locale('it'),
        name: 'Irradianza (longwave)',
      },
    ],
    measurementUnit: 'W/m²',
  },
  {
    id: 'PCO2XXXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Carbon dioxide',
      },
      {
        locale: new Locale('it'),
        name: 'Diossido di carbonio',
      },
    ],
    measurementUnit: 'µatm',
  },
  {
    id: 'SIGTEQ01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Sigma-theta',
      },
      {
        locale: new Locale('it'),
        name: 'Sigma-theta',
      },
    ],
    measurementUnit: 'kg/m³',
  },
  {
    id: 'VSCTXXXX',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Volume scattering of light',
      },
      {
        locale: new Locale('it'),
        name: 'Diffusione volumetrica della luce',
      },
    ],
    measurementUnit: '%',
  },
  {
    id: 'TEMPMEAS',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Temperature (of measurement)',
      },
      {
        locale: new Locale('it'),
        name: 'Temperatura (di misura)',
      },
    ],
    measurementUnit: '°C',
  },
  {
    id: 'IRRDUV01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Irradiance (PAR wavelengths)',
      },
      {
        locale: new Locale('it'),
        name: 'Irradianza (PAR wavelengths)',
      },
    ],
    measurementUnit: 'uE/m²/s',
  },
  {
    id: 'TURBPR01',
    measurementName: [
      {
        locale: new Locale('en'),
        name: 'Turbidity of water',
      },
      {
        locale: new Locale('it'),
        name: "Torbidità dell'acqua",
      },
    ],
    measurementUnit: 'NTU',
    /* Nephelometric Turbidity Units */
  },
  

];
