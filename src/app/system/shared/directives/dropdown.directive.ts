import {Directive, HostBinding, HostListener} from "@angular/core"

@Directive({
    selector: '[apaDropdown]'
})
export class DropdownDirectives {


    @HostBinding('class.open') isOpen = false;

    @HostListener('click') onClick (){
        console.log(this)
        this.isOpen = !this.isOpen;
    }
}