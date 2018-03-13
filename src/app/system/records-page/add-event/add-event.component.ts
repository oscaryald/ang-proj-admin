import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';

import {Category} from '../../shared/models/category.model';
import {APAEvent} from '../../shared/models/event.model';
import {EventsService} from '../../shared/services/events.service';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import {Messages} from '../../../shared/models/messages.models';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'apa-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {


  sub1: Subscription;
  sub2: Subscription;
  @Input() categories: Category[] = [];
  types = [
      {
        type: 'income',
        label: 'Income'
      },
      {
        type: 'outcome',
        label: 'Outcome'
      }
  ];

  message: Messages;

  constructor(
      private eventService: EventsService,
      private billService: BillService
  ) { }

  ngOnInit() {
    this.message = new Messages('danger', '');
  }

  private showMessage(text: string){
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm){
    let {amount, description, category, type} = form.value;

    if (amount < 0) amount *= -1;

    const event = new APAEvent(
        type,
        amount,
        +category,
        moment().format('DD.MM.YYYY HH:mm:ss'),
        description
    );

    this.sub1 = this.billService.getBill()
        .subscribe((bill: Bill) => {
          let value = 0;
          if (type === 'outcome'){
            if (amount > bill.value){
              this.showMessage(`Not enough money, you don't have ${amount - bill.value}`);
              return
            } else {
              value = bill.value - amount;
            }
          } else {
            value = bill.value + amount;
          }

          this.sub2 = this.billService.updateBill({value: value, currency: bill.currency})
              .mergeMap(() => this.eventService.addEvent(event))
              .subscribe(() => {
                form.setValue({
                    amount: 0,
                    description: ' ',
                    category: 1,
                    type: 'outcome'
                });
                  this.eventService.addEvent(event)
              });

        });
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
  }

}
