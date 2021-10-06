import { LightningElement, track, api, wire } from 'lwc';
import getDataForCart from '@salesforce/apex/ShopController.getDataForCart';


export default class Cart extends LightningElement {
    @track products;
    @track productToShow;
    @track cartEmpty; 
    
    showCartWindow(){
        this.productToShow = this.handleLoad();
        this.handleProxyObject();
        var data = this.template.querySelector(".slds-is-open");
        if (data){
            this.template.querySelector(".slds-dropdown-trigger").classList.remove('slds-is-open');
        }else{
            this.template.querySelector(".slds-dropdown-trigger").classList.add('slds-is-open');
        }
    }

    handleLoad(){
        var pr = this.readCookie();
       return pr;
    }

    handleProxyObject(){
        console.log(this.productToShow);
        this.products = [];
        Object.keys(this.productToShow).forEach(el=>{
            this.products.push(this.productToShow[el]);
        })
        console.log('lenth', this.products.length);
        if(this.products.length > 0){
            this.cartEmpty = false;
        }else{
            this.cartEmpty = true;
        }
        console.log(this.cartEmpty);
    }

    readCookie(){
        var arr =  document.cookie.split(';');
        var returnArr = new Map();
        arr.forEach(element => {
            var value = element.split('=');
            if (value.shift().trim() == 'cart'){
                if (value != ''){
                    returnArr = JSON.parse(value);    
                    return;
                }
            }
        });
        return returnArr;
    }

    getProductDetailData(){
        var ids = [];
        for(let key of this.productsCountedMap.keys()){
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

    add(){
        this.productToShow = this.handleLoad();
        this.handleProxyObject(); 
    }
}