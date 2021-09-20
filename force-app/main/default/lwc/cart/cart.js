import { LightningElement, track, api, wire } from 'lwc';
import getDataForProductCard from '@salesforce/apex/ShopController.getDataForProductCard';


export default class Cart extends LightningElement {
    cookiesArr;

    constructor(){
        super();
        this.cookiesArr = this.readCookie();
    }
    

    //получить из куки массив id
    //рассчиатвть counter при загрузке страницы
    // 

    showCartWindow(){
        var data = this.template.querySelector(".slds-is-open");
        if (data){
            this.template.querySelector(".slds-dropdown-trigger").classList.remove('slds-is-open');
        }else{
            this.template.querySelector(".slds-dropdown-trigger").classList.add('slds-is-open');
        }
    }


    @wire(getDataForProductCard, {ids: ''})
    getProductData(){
    }

    readCookie(){
        var arr =  document.cookie.split(';');
        var returnArr = [];
        arr.forEach(element => {
            var value = element.split('=');
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