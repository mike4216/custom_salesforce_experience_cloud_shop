import { LightningElement } from 'lwc';

export default class Cart extends LightningElement {
    showCart = false;

    showCartWindow(){
        var data = this.template.querySelector(".slds-is-open");
        if (data){
            this.template.querySelector(".slds-dropdown-trigger").classList.remove('slds-is-open');
        }else{
            this.template.querySelector(".slds-dropdown-trigger").classList.add('slds-is-open');
        }
    }
}