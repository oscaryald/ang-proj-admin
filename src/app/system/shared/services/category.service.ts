
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import { Category } from '../models/category.model';
import {BaseApi} from "../../../shared/core/base-api";

@Injectable()
export class CategoryService extends BaseApi{
    constructor(
        public http: Http,
    ){
        super(http);
    }

    addCategory(category: Category): Observable<Category>{
            return this.post('categories', category);
    }

    getCategories(): Observable<Category[]>{
        return this.get('categories')
    }

    updateCategories(category: Category): Observable<Category>{
        return this.put(`categories/${category.id}`, category)
    }



}