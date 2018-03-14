import {BaseApi} from '../../../shared/core/base-api';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {APAEvent} from '../models/event.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventsService extends BaseApi{
    constructor(public http: Http){
        super(http);
    }

    addEvent(event: APAEvent): Observable<APAEvent>{
        return this.post('events', event)
    }

    getEvents(): Observable<APAEvent[]>{
        return this.get('events');
    }
}
