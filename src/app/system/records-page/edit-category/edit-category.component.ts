import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/models/category.model";
import {CategoryService} from "../../shared/services/category.service";
import {Messages} from "../../../shared/models/messages.models";

@Component({
  selector: 'apa-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId: number = 1;
  currentCategory: Category;
  message: Messages;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.onCategoryChange();
    this.message = new Messages('success', '')
  }

  onCategoryChange(){
        this.currentCategory = this.categories
            .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm){
      let {name, capacity} = form.value;
      if(capacity < 0) capacity *= -1;

      const category: Category = new Category(name, capacity, +this.currentCategoryId)

      this.categoryService.updateCategories(category)
          .subscribe((category: Category) => {
            console.log(category)
            this.onCategoryEdit.emit(category);
            this.message.text = "category is succesfully edited";
            setTimeout( () => this.message.text = '', 5000)
          })
  }



  // onCategoryEdit(category){
  //
  //
  // }

}
