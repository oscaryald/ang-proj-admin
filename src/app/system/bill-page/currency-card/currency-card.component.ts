import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'apa-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit{

  @Input() currency: any;

  currencys: string[] = [];

  constructor() { }

    ngOnInit() {
        console.log(this.currency)

        this.currencys = ['EUR', 'GBP'];

    }



}
