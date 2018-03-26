import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'apa-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent{

  @Output() onFilterCancel = new EventEmitter <any>();
  @Output() onFilterApply = new EventEmitter <any>();

  @Input() categories: Category[];

  timePeriods = [
      {
          type: 'd',
          label: 'Day'
      },
      {
          type: 'w',
          label: 'Week'
      },
      {
          type: 'M',
          label: 'Month'
      }
  ]

    selectedPeriod = 'd';
    selectedTypes = [];
    selectedCategories = [];

  types = [
      {
          type: 'income',
          label: 'Income'
      },
      {
          type: 'outcome',
          label: 'Outcome'
      },
  ]

  constructor() { }

  closeFilter(){
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.onFilterCancel.emit();
  }

  private calculateInputParams(field: string, checked: boolean, value: string){
      if(checked){
          this[field].indexOf(value) === -1 ? this[field].push(value) : null;
      }else{
          this[field] = this[field].filter((i) => i !== value)
      }
  }

    handleChangeType({checked, value}){
        this.calculateInputParams('selectedTypes', checked, value);
    }

    handleChangeCategory({checked, value}){
        this.calculateInputParams('selectedCategories', checked, value);
    }

    applyFilter(){
      this.onFilterApply.emit({
          types: this.selectedTypes,
          category: this.selectedCategories,
          period: this.selectedPeriod,
      })
    }

}
