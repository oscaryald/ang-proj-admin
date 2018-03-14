import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BillService} from '../shared/services/bill.service';
import {CategoryService} from '../shared/services/category.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {APAEvent} from '../shared/models/event.model';
import {Bill} from '../shared/models/bill.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'apa-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1: Subscription
  bill: Bill;
  categories: Category[] = [];
  events: APAEvent[] = [];

  constructor(
      private billService: BillService,
      private categoryService: CategoryService,
      private eventsServise: EventsService
              ) { }

  ngOnInit() {

    this.s1 = Observable.combineLatest(
        this.billService.getBill(),
        this.categoryService.getCategories(),
        this.eventsServise.getEvents()
    ).subscribe((data: [ Bill, Category[], APAEvent[] ]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.events = data[2];

        this.isLoaded = true;
    });

  }

  getCategoryCoast(category: Category): number{

    const categoryEvents = this.events.filter( (categoryEvent) => {
          return categoryEvent.category === category.id && categoryEvent.type === 'outcome';
    });

    return categoryEvents.reduce((total, categoryEvent) => {
      total += categoryEvent.amount;
      return total;
    }, 0);

  }

  private getPercent(category: Category): number{
    const percent = (100 * this.getCategoryCoast(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category: Category): string{
    return this.getPercent(category) + '%';
  }

  getColorClass(category: Category): string{
    const percent = this.getPercent(category);
    const className = percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
    return className;
  }

  ngOnDestroy(){
    if(this.s1){
        this.s1.unsubscribe();
    }
  }

}
