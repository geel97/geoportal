import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export interface Parameter {
  name: string;
  type: DataType;
}

export enum DataType {
  TIME_SERIES = 'TS',
  PROFILE = 'PR',
}

export interface Measurement {
  parameter: Parameter;
  measurement: number;
  depth: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ErddapService {
  constructor(private http: HttpClient) {}

  getMeasurements(
    dataset: string,
    parameter: Parameter,
    depth: number,
    timeStart: Date,
    timeEnd?: Date
  ): Observable<Measurement[]> {
    let url =
      environment.erddapUrl +
      'tabledap/' +
      dataset +
      '_' +
      parameter.type +
      '.json?' +
      'time,' +
      'depth,' +
      parameter.name +
      '&' +
      parameter.name +
      '_QC=~"[0-2]"';
    '&time>=' + timeStart.toISOString();

    if (timeEnd != null) url += '&time<=' + timeEnd.toISOString();

    url += '&' + parameter.name + '!=NaN';

    url += '&depth=' + depth;

    url += '&orderBy("time")';

    return this.http.get(url).pipe(
      map((result: any) => {
        let measurements = new Array();
        result.table.rows.forEach((row: any) => {
          measurements.push({
            parameter: {
              name: result.table.columnNames[2],
              type: parameter.type,
            },
            measurement: row[2],
            depth: row[1],
            timestamp: row[0],
          });
        });
        return measurements;
      })
    );
  }

  getLastMeasurements(
    dataset: string,
    parameter: Parameter,
    timeStart: Date,
    timeEnd?: Date
  ): Observable<Measurement[]> {
    let url =
      environment.erddapUrl +
      'tabledap/' +
      dataset +
      '_' +
      parameter.type +
      '.json?' +
      'time,' +
      'depth,' +
      parameter.name +
      '&' +
      parameter.name +
      '_QC=~"[0-2]"';
    '&time>=' + timeStart.toISOString();

    if (timeEnd != null) url += '&time<=' + timeEnd.toISOString();

    url += '&' + parameter.name + '!=NaN';
    url += '&orderByMax("depth,time")';

    return this.http.get(url).pipe(
      map((result: any) => {
        let measurements = new Array();
        result.table.rows.forEach((row: any) => {
          measurements.push({
            parameter: {
              name: result.table.columnNames[2],
              type: parameter.type,
            },
            measurement: row[2],
            depth: row[1],
            timestamp: row[0],
          });
        });
        return measurements;
      })
    );
  }

  getDepth(dataset: string, parameter: Parameter, timeStart: Date, timeEnd?: Date): Observable<number[]> {
    let url = environment.erddapUrl + 'tabledap/' + dataset + '_' + parameter.type + '.json?' + 'depth';
    '&time>=' + timeStart.toISOString();

    if (timeEnd != null) url += '&time<=' + timeEnd.toISOString();

    url += '&' + parameter.name + '!=NaN';
    '&' + parameter.name + '_QC=~"[0-2]"';
    url += '&orderBy("depth")';
    url += '&distinct()';
    return this.http.get(url).pipe(
      map((result: any) => {
        return result.table.rows.map((row: number[]) => row[0]);
      })
    );
  }
}
