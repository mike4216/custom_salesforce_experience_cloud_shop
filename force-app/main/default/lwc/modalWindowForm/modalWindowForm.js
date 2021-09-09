import { LightningElement, api, track } from 'lwc';
import CUSTOMER_HISTORY_OBJ from '@salesforce/schema/Customer_history__c';

import NAME_FIELD from '@salesforce/schema/Customer_history__c.Name';
import MOBILE_PHONE_FIELD from '@salesforce/schema/Customer_history__c.Mobile_phone__c';
// import PRODUCT_FIELD from '@salesforce/schema/Customer_history__c.Product__c';
import QUANTITY_FIELD from '@salesforce/schema/Customer_history__c.Quantity__c';

export default class ModalWindowForm extends LightningElement {
    @api productid;
    @api  objectApiName = CUSTOMER_HISTORY_OBJ

    fields = [NAME_FIELD, MOBILE_PHONE_FIELD, QUANTITY_FIELD];


    handleSubmit(event){
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    handleSuccess(event){
        this.template.querySelector(".message").innerText = 'Your order submitted';
    }
}

