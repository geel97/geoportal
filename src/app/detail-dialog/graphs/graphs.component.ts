import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { DataType, ErddapService, Parameter, Measurement } from '../../erddap.service';
import IndicatorsCore from 'highcharts/indicators/indicators';
import IndicatorZigzag from 'highcharts/indicators/zigzag';
import { Options } from 'highcharts';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { VocabService } from '../../vocab.service';

interface TimeSeries {
  parameter: Parameter;
  depths: number[];
}

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  loading = true;
  chartRef!: Highcharts.Chart;
  timeseries: TimeSeries[] = [];
  timeseriesLoaded!: Promise<boolean>;
  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };
  @Input() data!: Collection<Feature<Geometry>>;
  chartOptions: Options;
  constructor(private erdappService: ErddapService, public vocabService: VocabService) {
    this.chartOptions = {
      title: { text: undefined },
      chart: {
        events: {
          load: event => {
            this.chartRef.showLoading('Loading data from server...');
          },
        },
      },
      time: {
        useUTC: false,
      },
      rangeSelector: {
        buttons: [
          {
            type: 'hour',
            count: 1,
            text: '1h',
            title: 'View 1 hour',
          },
          {
            type: 'hour',
            count: 6,
            text: '6h',
            title: 'View 6 hour',
          },
          {
            type: 'day',
            count: 1,
            text: '1d',
            title: 'View 1 day',
          },
          {
            type: 'week',
            text: '1w',
            title: 'View 1 week',
          },
          {
            type: 'month',
            count: 1,
            text: '1m',
            title: 'View 1 month',
          },
          {
            type: 'all',
            text: '6m',
            title: 'View 6 months',
          },
        ],
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
      },
      series: [],
    };
  }

  ngOnInit(): void {
    this.getTimeSeriesAvailable(this.data.item(0).get('name'), this.daysAgoMidnightUTC(120));

    this.getDataArray(
      this.data.item(0).get('name'),
      { name: 'WSPD', type: DataType.TIME_SERIES },
      this.daysAgoMidnightUTC(120)
    );
  }

  getTimeSeriesAvailable(dataset: string, timeStart: Date, timeEnd?: Date) {
    this.data
      .item(0)
      .get('dialog_par')
      .split(',')
      .map((param: string) => {
        this.erdappService
          .getDepth(dataset, { name: param, type: DataType.TIME_SERIES }, timeStart, timeEnd)
          .subscribe((response: number[]) => {
            this.timeseries = this.timeseries.concat({
              parameter: { name: param, type: DataType.TIME_SERIES },
              depths: response,
            });
            this.timeseriesLoaded = Promise.resolve(true);
          });
      });
  }

  getDataArray(dataset: string, parameter: Parameter, timeStart: Date, timeEnd?: Date) {
    let dataArray: number[][] = [];
    this.loading = true;
    this.erdappService.getData(dataset, parameter, false, timeStart, timeEnd).subscribe(
      (response: Measurement[]) => {
        dataArray = response.map((measure: Measurement) => {
          return [new Date(measure.timestamp).getTime(), measure.measurement];
        });

        this.chartRef.addSeries({
          id: parameter.name,
          name: this.vocabService.getMeasurementName(parameter.name),
          type: 'line',
          data: dataArray,
          tooltip: {
            valueDecimals: 2,
            valueSuffix: this.vocabService.getMeasurementUnit(parameter.name),
          },
        });
        this.chartRef.addAxis({
          type: 'linear',
          title: {
            text: this.vocabService.getMeasurementUnit(parameter.name),
          },
        });
      },
      (error: any) => {
        this.loading = false;
        this.chartRef.hideLoading();
        console.log(error);
      },
      () => {
        this.updateFlag = true;
        this.loading = false;
        this.chartRef.hideLoading();
      }
    );
    return dataArray;
  }

  midnightUTC(): Date {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }
  daysAgoMidnightUTC(days: number): Date {
    let date = this.midnightUTC();
    date.setDate(date.getDate() - days);
    return date;
  }
}
