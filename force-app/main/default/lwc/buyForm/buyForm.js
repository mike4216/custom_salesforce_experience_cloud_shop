import { api, track, LightningElement } from 'lwc';
import saveOrder from '@salesforce/apex/ShopController.saveOrder';

export default class BuyForm extends LightningElement {
    @api label;
    @api name;
    @api productid;
    @api price;
    mapForSend = new Map();
    success;

    @track openModal = false;

    showModal() {
        this.openModal = true;

    }
    closeModal() {
        this.openModal = false;
    }

    handleBuyAction(){
        if (this.productid && this.price){
            this.fillUserData();
            this.mapForSend['ids'] = [this.productid];
            this.mapForSend['order_cost'] = this.price;
        }else{
            this.fillUserData();
            var order_cost = 0;
            var cartProducts = this.readCookie();
            var ids = Object.keys(cartProducts);
            ids.forEach(key=>{
                order_cost += parseFloat(cartProducts[key]['calculatedPrice'])
            });
            this.mapForSend['ids'] = ids;
            this.mapForSend['order_cost'] = order_cost;
        }
        this.mapForSend = JSON.stringify(this.mapForSend);
        this.save();
    }

    save(){
        saveOrder({ json: this.mapForSend })
            .then((result) => {
                this.openModal = false
            })
            .catch((error) => {
                //отправить сообщение 
            });
    }

    fillUserData(){
        this.mapForSend['first_name'] = this.template.querySelector('.first_name').value
        this.mapForSend['last_name'] = this.template.querySelector('.last_name').value
        this.mapForSend['tel'] = this.template.querySelector('.tel').value
        this.mapForSend['email'] = this.template.querySelector('.email').value
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
}