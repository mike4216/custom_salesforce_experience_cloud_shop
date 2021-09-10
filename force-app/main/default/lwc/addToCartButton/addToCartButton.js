import { LightningElement, api } from 'lwc';

export default class AddToCartButton extends LightningElement {
    @api productid;
    
    handleAddToCart(){
        var cookiesArr = this.readCookie();
        cookiesArr.push(this.productid);
        document.cookie="ids=" + this.arrToJson(cookiesArr);
        console.log(document.cookie);
    }

    arrToJson(arr){
        return JSON.stringify(arr)
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

    deleteCookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}