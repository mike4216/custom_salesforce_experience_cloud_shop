import MailingPostalCode from '@salesforce/schema/Contact.MailingPostalCode';
import { LightningElement, api, track } from 'lwc';

export default class AddToCartButton extends LightningElement {
    @api name;
    @api productid;
    @api image;
    @api price;
    @api positive
    @api label;
    
    handleAddToCart(){
        var cookiesMap = new Map();
        var productMap = new Map();
        console.log(this.positive);

        productMap['id'] =  this.productid;
        productMap['name'] = this.name;
        productMap['price'] = this.price;
        productMap['image'] = this.image;
        productMap['calculatedPrice'] = productMap['price'];
        productMap['count'] = 1;
      
        cookiesMap = this.readCookie();
        console.log(this.positive);

        if (this.positive){
            this.handlePositive(cookiesMap, productMap);
        }else{
            this.handleNegative(cookiesMap, productMap);
        }
        document.cookie="cart=" + this.arrToJson(cookiesMap);
        console.log(document.cookie);
    }

    handlePositive(cookiesMap, productMap){
        if(cookiesMap[this.productid]){
            cookiesMap[this.productid]['count'] += 1;
            cookiesMap[this.productid]['calculatedPrice'] = parseFloat(cookiesMap[this.productid]['price'])
                 * parseFloat(cookiesMap[this.productid]['count']);
        }else{
            cookiesMap[this.productid] = productMap; 
        }
    }

    handleNegative(cookiesMap, productMap){
        if(cookiesMap[this.productid]){
            if(cookiesMap[this.productid]['count'] > 0){
                cookiesMap[this.productid]['count'] -= 1;
                if(cookiesMap[this.productid]['count'] == 0){
                    // cookiesMap[this.productid] = '';
                    delete cookiesMap[this.productid];
                }else{
                    cookiesMap[this.productid]['calculatedPrice'] = 
                   parseFloat(cookiesMap[this.productid]['price'])
                   * parseFloat(cookiesMap[this.productid]['count']); 
                }  
            }else{
                console.log('deleting', productMap);
                delete cookiesMap[this.productid];
                console.log('deleting2', productMap);
            }
        }
    }


    arrToJson(map){
        return JSON.stringify(map)
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

    deleteCookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}