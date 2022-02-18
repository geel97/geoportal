import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { DataType, ErddapService, Parameter, Measurement } from '../erddap.service';
import IndicatorsCore from 'highcharts/indicators/indicators';
import IndicatorZigzag from 'highcharts/indicators/zigzag';
import HStockTools from 'highcharts/modules/stock-tools';
import HC_exporting from 'highcharts/modules/exporting';
import { Options, SeriesLineDataOptions } from 'highcharts/highstock';
import { VocabService } from '../vocab.service';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';

// HIndicatorsAll(Highcharts);
// HDragPanes(Highcharts);
// HAnnotationsAdvanced(Highcharts);
// HPriceIndicator(Highcharts);

IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  @Input() data!: Collection<Feature<Geometry>>;

  constructor(private erdappService: ErddapService, public vocabService: VocabService) {}

  ngOnInit(): void {
    
    this.getDataArray(this.data.item(0).get('name'), { name: 'WSPD', type: DataType.TIME_SERIES }, this.daysAgoMidnightUTC(5));
  }

  chartOptions!: Options;

  getDataArray(dataset: string, parameter: Parameter, timeStart: Date, timeEnd?: Date) {
    let dataArray = new Array<SeriesLineDataOptions>();
    this.erdappService.getData(dataset, parameter, false, timeStart, timeEnd).subscribe(
      (response: Measurement[]) => {
        dataArray = response.map((measure: Measurement) => {
          return { x: new Date(measure.timestamp).getTime(), y: measure.measurement };
        });

        this.chartOptions = {
          xAxis: {
            type: 'datetime',
            title: {
              text: 'Date',
            },
          },
          yAxis: [{
            title: {
              text: 'Wind speed (m/s)',
            }
          }],
          series: [
            {
              type: 'line',
              data: dataArray,
            },
          ],
        };
        this.updateFlag = true;
      },
      (error: any) => console.log(error)
    );
    console.log(dataArray);
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
