import { LightningElement, track, api } from 'lwc';

export default class Cart extends LightningElement {
    @api productcounter = 0;

    showCartWindow(){
        var data = this.template.querySelector(".slds-is-open");
        if (data){
            this.template.querySelector(".slds-dropdown-trigger").classList.remove('slds-is-open');
        }else{
            this.template.querySelector(".slds-dropdown-trigger").classList.add('slds-is-open');
        }
    }

    readCookie(){
        var arr =  document.cookie.split(';');
        var returnArr;
        arr.forEach(element => {
            var value = element.split('=')
            if (value.shift().trim() == 'ids'){
                returnArr = JSON.parse(value);
                return;
            }
        });
        return returnArr;
    }

    // updateCounter(event){
    //     console.log(event.detail);
    // }
}