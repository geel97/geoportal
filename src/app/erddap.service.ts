import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, mergeMap } from 'rxjs/operators';

export interface Parameter {
  name: string;
  type: DataType;
}

export enum DataType {
  TIME_SERIES = 'TS',
  PROFILE = 'PR',
}

export enum Axis {
  T = 'T',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

export interface Measurement {
  parameter: Parameter;
  measurement: number;
  depth: number | undefined;
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
    depth: number | undefined,
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
      'time' +
      ',' +
      parameter.name +
      (depth !== undefined ? ',depth' : '') +
      '&' +
      parameter.name +
      '_QC=~"[0-2]"' +
      '&time>=' +
      timeStart.toISOString() +
      (timeEnd != null ? '&time<=' + timeEnd.toISOString() : '') +
      '&' +
      parameter.name +
      '!=NaN' +
      (depth !== undefined ? '&depth=' + depth : '') +
      '&orderBy("time")';

    return this.http.get(url).pipe(
      map((result: any) => {
        let measurements = new Array<Measurement>();
        result.table.rows.forEach((row: any) => {
          measurements.push({
            parameter: {
              name: result.table.columnNames[1],
              type: parameter.type,
            },
            measurement: row[1],
            depth: depth !== undefined ? row[2] : undefined,
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
    return this.getAxisParameterName(dataset, parameter.type, Axis.Z).pipe(
      mergeMap(axisResult => {
        let url =
          environment.erddapUrl +
          'tabledap/' +
          dataset +
          '_' +
          parameter.type +
          '.json?' +
          'time' +
          ',' +
          parameter.name +
          (axisResult !== undefined && axisResult.name === 'depth' ? ',depth' : '') +
          '&' +
          parameter.name +
          '_QC=~"[0-2]"' +
          '&time>=' +
          timeStart.toISOString() +
          (timeEnd != null ? '&time<=' + timeEnd.toISOString() : '') +
          '&' +
          parameter.name +
          '!=NaN' +
          '&orderByMax("' +
          (axisResult !== undefined && axisResult.name === 'depth' ? 'depth,' : '') +
          'time")';

        return this.http.get(url).pipe(
          map((result: any) => {
            return result.table.rows.map((row: any[]) => {
              return {
                parameter: {
                  name: result.table.columnNames[1],
                  type: parameter.type,
                },
                measurement: row[1],
                depth: axisResult !== undefined && axisResult.name === 'depth' ? row[2] : undefined,
                timestamp: row[0],
              } as Measurement;
            });
          })
        );
      })
    );
  }

  getDepth(dataset: string, parameter: Parameter, timeStart: Date, timeEnd?: Date): Observable<number[] | undefined> {
    let url =
      environment.erddapUrl +
      'tabledap/' +
      dataset +
      '_' +
      parameter.type +
      '.json?' +
      'depth' +
      '&time>=' +
      timeStart.toISOString();

    if (timeEnd != null) url += '&time<=' + timeEnd.toISOString();

    url += '&' + parameter.name + '!=NaN';
    url += '&' + parameter.name + '_QC=~"[0-2]"';
    url += '&orderBy("depth")';
    url += '&distinct()';
    return this.http.get(url).pipe(
      map((result: any) => {
        return result.table.rows.map((row: number[]) => row[0]);
      })
    );
  }

  getAxisLayers(
    dataset: string,
    parameter: Parameter,
    timeStart: Date,
    timeEnd?: Date
  ): Observable<number[] | undefined> {
    return this.getAxisParameterName(dataset, parameter.type, Axis.Z).pipe(
      mergeMap(axisResult => {
        if (axisResult === undefined) return of(undefined);

        let url =
          environment.erddapUrl +
          'tabledap/' +
          dataset +
          '_' +
          parameter.type +
          '.json?' +
          axisResult.name +
          '&time>=' +
          timeStart.toISOString();

        if (timeEnd != null) url += '&time<=' + timeEnd.toISOString();

        url += '&' + parameter.name + '!=NaN';
        url += '&' + parameter.name + '_QC=~"[0-2]"';
        url += '&orderBy("' + axisResult.name + '")';
        url += '&distinct()';

        return this.http.get(url).pipe(
          map((result: any) => {
            return result.table.rows.map((row: number[]) => row[0]);
          })
        );
      })
    );
  }

  getAxisParameterName(dataset: string, dataType: DataType, axis: Axis): Observable<Parameter | undefined> {
    let url = environment.erddapUrl + 'info/' + dataset + '_' + dataType + '/index.json';

    return this.http.get(url).pipe(
      map((result: any) => {
        return (result.table.rows as string[][])
          .filter((row: string[]) => row[2] == 'axis' && row[4] == axis)
          .map((row: string[]) => {
            return { name: row[1], type: dataType } as Parameter;
          })
          .pop();
      })
    );
  }

  getMeasurementUnit(dataset: string, parameter: Parameter): Observable<string | undefined> {
    let url = environment.erddapUrl + 'info/' + dataset + '_' + parameter.type + '/index.json';

    return this.http.get(url).pipe(
      map((result: any) => {
        return (result.table.rows as string[][])
          .filter((row: string[]) => row[1] == parameter.name && row[2] == 'units')
          .map((row: string[]) => {
            return row[4];
          })
          .pop();
      })
    );
  }
}
