import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import {CategoryService} from "../../shared/services/category.service";
import {Category} from "../../shared/models/category.model";
import {Subscription} from 'rxjs/Subscription';



@Component({
  selector: 'apa-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{

  @Output() onCategoryAdd = new EventEmitter<Category>();

    sub1: Subscription;
  constructor(private categoryService: CategoryService) { }

  onSubmit(form: NgForm){
    let {name, capacity} = form.value;
    if(capacity < 0) capacity *= -1;

    const category = new Category(name, capacity)

    this.sub1 = this.categoryService.addCategory(category)
        .subscribe((category: Category) => {
          console.log(category);
          form.reset();
          form.form.patchValue({capacity: 1});
          this.onCategoryAdd.emit(category);
        });
  }

  ngOnDestroy(){
      if(this.sub1) this.sub1.unsubscribe();
  }

}
