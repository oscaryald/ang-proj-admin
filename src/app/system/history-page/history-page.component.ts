import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';

import {CategoryService} from '../shared/services/category.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {APAEvent} from '../shared/models/event.model';


@Component({
    selector: 'apa-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor(private categoriesService: CategoryService,
                private eventService: EventsService) {
    }

    isLoaded = false;
    s1: Subscription;

    categories: Category[] = [];
    events: APAEvent[] = [];
    filteredEvents: APAEvent[] = [];

    chartData = [];

    isFilterVisible: boolean = false;

    ngOnInit() {

        this.s1 = Observable.combineLatest(
            this.categoriesService.getCategories(),
            this.eventService.getEvents()
        ).subscribe((data: [Category[], APAEvent[]]) => {
            this.categories = data[0];
            this.events = data[1];

            this.setOriginalEvents();
            this.calculateChartData();

            this.isLoaded = true;
        });
    }

    calculateChartData(): {} {
        this.chartData = [];
        this.categories.forEach((cat) => {
            const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
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

    private toggleFilterVisibility(dir: boolean) {
        this.isFilterVisible = dir;
    }

    private setOriginalEvents(){
        this.filteredEvents = this.events.slice();
    }

    openFilter() {
        this.toggleFilterVisibility(true);
    }

    onFilterApply(filterData) {
        this.toggleFilterVisibility(false);
        this.setOriginalEvents();

        const startPeriod = moment().startOf(filterData.period).startOf('d');
        const endPeriod = moment().endOf(filterData.period).endOf('d');

        this.filteredEvents = this.filteredEvents
            .filter((e) => {
                return filterData.types.indexOf(e.type) !== -1;
            })
            .filter((e) => {
                return filterData.category.indexOf(e.category.toString()) !== -1;
            })
            .filter((e) => {
                const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss')
                return momentDate.isBetween(startPeriod, endPeriod)
            });
        this.calculateChartData();
    }

    onFilterCancel() {
        this.toggleFilterVisibility(false);
        this.setOriginalEvents();
        this.calculateChartData();
    }

    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }

}
