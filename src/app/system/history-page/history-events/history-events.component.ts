import { Component, OnInit, Input } from '@angular/core';
import {APAEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'apa-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: APAEvent[] = [];

  constructor() { }



  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    })
  }

    getEventClass(e: APAEvent){
      return{
        'label': true,
          'label-danger': e.type === 'outcome'
          'label-success': e.type === 'income'
      }
    }

}
