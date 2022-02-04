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

  getData(
    dataset: string,
    parameter: Parameter,
    lastMeasurement: boolean,
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
      '&time>=' +
      timeStart.toISOString();

    if (timeEnd != null) url += '&time<=' + timeEnd.toISOString();

    url += '&' + parameter.name + '!=NaN';

    if (lastMeasurement) url += '&orderByMax("depth,time")';

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
}
