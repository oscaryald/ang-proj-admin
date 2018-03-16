import {Component, Input} from '@angular/core';

@Component({
  selector: 'apa-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent{

  @Input() data

  view: any[] = [545, 355];

  constructor() { }


}
