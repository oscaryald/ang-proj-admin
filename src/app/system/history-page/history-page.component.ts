import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../shared/services/category.service';
import {EventsService} from '../shared/services/events.service';
import {Observable} from 'rxjs/Observable';
import {Category} from '../shared/models/category.model';
import {APAEvent} from '../shared/models/event.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'apa-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(
      private categoriesService: CategoryService,
      private eventService: EventsService
  ) { }

  isLoaded = false;
  s1: Subscription

  categories: Category[] = [];
  events: APAEvent[] = [];

  chartData = [];

  ngOnInit() {

    this.s1 = Observable.combineLatest(
        this.categoriesService.getCategories(),
        this.eventService.getEvents()
    ).subscribe( ( data: [Category[], APAEvent[]] ) => {
      this.categories = data[0];
      this.events = data[1];
      this.calculateChartData();

      this.isLoaded = true;
    })
  }

  calculateChartData(): {} {
      this.chartData = [];
      this.categories.forEach((cat) => {
        const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
        const catValue = catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0);
        this.chartData.push({
            name: cat.name,
            value: catValue
        });
      });
      return this.chartData;
  }

  ngOnDestroy(){
    if(this.s1){
      this.s1.unsubscribe()
    }
  }

}
