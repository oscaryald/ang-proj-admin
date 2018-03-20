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

  searchValue: string = '';
  searchPlaceholder: string = 'Amount';
  searhField: string = 'amount';
  constructor() { }



  ngOnInit() {
    this.events.forEach((ev) => {
        ev.catName = this.categories.find(c => c.id === ev.category).name;
    });

  }

  getEventClass(e: APAEvent){
      return{
        'label': true,
          'label-danger': e.type === 'outcome',
          'label-success': e.type === 'income'
      }
  }

  changeCriteria(field: string){
    const namesMap = {
      amount:'Amount',
      date:'Date',
      category:'Category',
      type:'Type'
    }
    this.searchPlaceholder = namesMap[field];
    this.searhField = field;
  }

}
