import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { DataType, ErddapService, Parameter, Measurement, Axis } from '../../erddap.service';
import { Options } from 'highcharts';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { VocabService } from '../../vocab.service';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportdata from 'highcharts/modules/export-data';
HC_exporting(Highcharts);
HC_exportdata(Highcharts);

interface TimeSeries {
  parameter: Parameter;
  series: {
    depth: number | undefined;
    selected: boolean;
  }[];
}

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  loading = 0;
  chartRef!: Highcharts.Chart;
  timeseries: TimeSeries[] = [];
  timeseriesLoaded!: Promise<boolean>;
  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  allSelected(timeseries: TimeSeries) {
    return timeseries.series != null && timeseries.series.every(s => s.selected);
  }
  someSelected(timeseries: TimeSeries): boolean {
    return timeseries.series != null && timeseries.series.some(s => s.selected) && !this.allSelected(timeseries);
  }
  selectAll(selected: boolean, timeseries: TimeSeries) {
    if (timeseries.series == null) return;
    timeseries.series.forEach(s => (s.selected = selected));
  }

  updateChart() {
    this.timeseries.forEach(timeseries => {
      timeseries.series.forEach(series => {
        if (series.selected)
          if (!this.chartRef.get(timeseries.parameter.name + series.depth))
            this.addSeries(
              this.data.item(0).get('name'),
              timeseries.parameter,
              series.depth,
              this.daysAgoMidnightUTC(120)
            );
          else (this.chartRef.get(timeseries.parameter.name + series.depth) as Highcharts.Series).show();
        else if (this.chartRef.get(timeseries.parameter.name + series.depth))
          (this.chartRef.get(timeseries.parameter.name + series.depth) as Highcharts.Series).hide();
      });
    });
  }

  @Input() data!: Collection<Feature<Geometry>>;
  chartOptions: Options;
  constructor(private erdappService: ErddapService, public vocabService: VocabService) {
    this.chartOptions = {
      title: { text: undefined },
      chart: {
        events: {
          load: event => {
            this.chartRef.showLoading('Please select one or more series');
          },
        },
      },
      time: {
        useUTC: false,
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              'printChart',
              'separator',
              'downloadPNG',
              'downloadJPEG',
              'downloadPDF',
              'downloadSVG',
              'separator',
              'downloadCSV',
              'downloadXLS',
            ],
          },
        },
      },

      rangeSelector: {
        enabled: true,
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
            type: 'month',
            count: 4,
            text: '4m',
            title: 'View 4 months',
          },
        ],
      },
      navigator: {
        enabled: false,
      },
      xAxis: {
        ordinal: false,
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
  }

  getTimeSeriesAvailable(dataset: string, timeStart: Date, timeEnd?: Date) {
    let dialogParam = this.data.item(0).get('dialog_par').split(',');
    dialogParam.map((param: string) => {
      this.loading++;
      this.erdappService
        .getAxisLayers(dataset, { name: param, type: DataType.TIME_SERIES }, timeStart, timeEnd)
        .subscribe(
          (response: number[] | undefined) => {
            this.timeseries = this.timeseries.concat({
              parameter: { name: param, type: DataType.TIME_SERIES },
              series:
                response !== undefined
                  ? response.map(depth => {
                      return { depth: depth, selected: false };
                    })
                  : [{ depth: undefined, selected: false }],
            });
            this.timeseries.sort(
              (a, b) => dialogParam.indexOf(a.parameter.name) - dialogParam.indexOf(b.parameter.name)
            );
            this.timeseriesLoaded = Promise.resolve(true);
          },
          (error: any) => {
            this.loading--;
            console.log(error);
          },
          () => {
            this.loading--;
          }
        );
    });
  }

  addSeries(dataset: string, parameter: Parameter, depth: number | undefined, timeStart: Date, timeEnd?: Date) {
    let dataArray: number[][] = [];
    this.loading++;
    this.erdappService.getMeasurements(dataset, parameter, depth, timeStart, timeEnd).subscribe(
      (response: Measurement[]) => {
        dataArray = response.map((measure: Measurement) => {
          return [new Date(measure.timestamp).getTime(), measure.measurement];
        });
        let measurementUnit = this.vocabService.getMeasurementUnit(parameter.name);

        if (measurementUnit !== undefined && !this.chartRef.get(measurementUnit))
          this.chartRef.addAxis({
            id: measurementUnit,
            type: 'linear',
            showEmpty: false,
            labels: {
              format: '{value} ' + measurementUnit,
            },
          });
        if (!this.chartRef.get(parameter.name + depth))
          // per evitare bug con selezioni multiple veloci
          this.chartRef.addSeries({
            id: parameter.name + depth,
            name: this.vocabService.getMeasurementName(parameter.name),
            type: 'line',
            yAxis: measurementUnit,
            data: dataArray,
            tooltip: {
              valueDecimals: 2,
              valueSuffix: measurementUnit,
            },
          });
        else (this.chartRef.get(parameter.name + depth) as Highcharts.Series).show(); // stessa cosa di sopra
      },
      (error: any) => {
        this.loading--;
        this.chartRef.hideLoading();
        console.log(error);
      },
      () => {
        this.updateFlag = true;
        this.loading--;
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
