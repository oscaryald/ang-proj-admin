
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'apaFilter'
})
export class FilterPipe implements PipeTransform{
    transform(items:any, value: string, field:string): any{
        if(items.length === 0 || !value){
            return items;
        }

        return items.filter((item) => {
            const itemCopy = Object.assign({}, item)
            if(!isNaN(itemCopy[field])){
                itemCopy[field] += '';
            }

            if(field === 'category'){
                itemCopy[field] = itemCopy['catName'];
            }
            return itemCopy[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        })
    }
}