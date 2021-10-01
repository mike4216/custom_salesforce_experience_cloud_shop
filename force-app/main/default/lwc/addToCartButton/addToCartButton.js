import MailingPostalCode from '@salesforce/schema/Contact.MailingPostalCode';
import { LightningElement, api, track } from 'lwc';

export default class AddToCartButton extends LightningElement {
    @api productid;
    @api name;
    @api price;

    handleAddToCart(){
        var cookiesMap = new Map();

        var productMap = new Map();
        productMap['id'] =  this.productid;
        productMap['name'] = this.name;
        productMap['price'] = this.price;
        productMap['count'] = 1;

        cookiesMap[this.productid] = productMap;
      
        cookiesMap = this.readCookie();
      
        if(cookiesMap[this.productid]){
            cookiesMap[this.productid]['count'] += 1
        }else{
            cookiesMap[this.productid] = productMap;
        }
        document.cookie="cart=" + this.arrToJson(cookiesMap);
    }

    arrToJson(map){
        return JSON.stringify(map)
    }

    readCookie(){
        var arr =  document.cookie.split(';');
        var returnArr = [];
        arr.forEach(element => {
            var value = element.split('=');
            if (value.shift().trim() == 'cart'){
                returnArr = JSON.parse(value);
                return;
            }
        });
        return returnArr;
    }

    deleteCookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}