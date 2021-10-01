import { LightningElement, track, api, wire } from 'lwc';
import getDataForCart from '@salesforce/apex/ShopController.getDataForCart';


export default class Cart extends LightningElement {
    @track products

    showCartWindow(){
        this.handleLoad();
        var data = this.template.querySelector(".slds-is-open");
        if (data){
            this.template.querySelector(".slds-dropdown-trigger").classList.remove('slds-is-open');
        }else{
            this.template.querySelector(".slds-dropdown-trigger").classList.add('slds-is-open');
        }
    }

    handleLoad(){
        //get cookies and count the number of products
        var productsCountedMap = this.dublicateCounter(this.readCookie());
        this.getProductDetailData(productsCountedMap);
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

    getProductDetailData(productsCountedMap){
        var ids = [];
        for(let key of productsCountedMap.keys()){
            ids.push(key);
        }
        getDataForCart({ids: ids})
            .then(result => {
                this.products = result;
            })
            .catch(error => {
                this.error = error;
            });
        console.log(this.products.length);
        
    }

    // @track cookiesArr;
    // @track products; //for product detail data
    // @track error;
    // ids;
    // productsCounter;

    // //получили ids
    // //нужно остаивть только уникальныке ids и заполнить кол-во id

    // constructor(){
    //     super();
    //     this.cookiesArr = this.readCookie();
    //     this.ids = [];
    //     this.productsCounter = new Map();
    //     this.products = [];

    // }
    
    // showCartWindow(){
    //     this.handleLoad();
    //     var data = this.template.querySelector(".slds-is-open");
    //     if (data){
    //         this.template.querySelector(".slds-dropdown-trigger").classList.remove('slds-is-open');
    //     }else{
    //         this.template.querySelector(".slds-dropdown-trigger").classList.add('slds-is-open');
    //     }
         
    // }

    // handleLoad() {
    //     this.productsCounter = this.dublicateCounter();
    //     var productsIds = [];
    //     for(let key of this.productsCounter.keys()){
    //         productsIds.push(key);
    //     }
    //     getDataForCart({ids: productsIds})
    //         .then(result => {
    //             this.products = result;
    //         })
    //         .catch(error => {
    //             this.error = error;
    //         });
    //     console.log('products ' + this.products);
    // }

    // // @wire(getDataForCart, {ids: this.cookiesArr})
    // // products;

    // readCookie(){
    //     var arr =  document.cookie.split(';');
    //     var returnArr = [];
    //     arr.forEach(element => {
    //         var value = element.split('=');
    //         if (value.shift().trim() == 'ids'){
    //             returnArr = JSON.parse(value);
    //             return;
    //         }
    //     });
    //     return returnArr;
    // }

    dublicateCounter(arr){
        var productsMap = new Map();
        arr.forEach(function(element){
            productsMap.set(element, productsMap.get(element) + 1 || 1);
        });
        return productsMap;
    }

    // updateCounter(event){
    //     console.log(event.detail);
    // }
}