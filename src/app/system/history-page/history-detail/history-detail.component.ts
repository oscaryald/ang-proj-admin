import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoryService} from '../../shared/services/category.service';
import {APAEvent} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'apa-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: APAEvent;
  category: Category;

  isLoaded = false;
  s1: Subscription

  constructor(
      private route: ActivatedRoute,
      private eventsService: EventsService,
      private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.s1 = this.route.params
        .mergeMap((params: Params) => this.eventsService.getEventById(params['id']))
        .mergeMap((event: APAEvent) => {
          this.event = event;
          return this.categoryService.getCategoryById(event.category)
        })
        .subscribe((category: Category) => {
          this.category = category;
          console.log(category);

          this.isLoaded = true;
        })
  }

  ngOnDestroy(){
    if(this.s1){
      this.s1.unsubscribe();
    }
  }

}
