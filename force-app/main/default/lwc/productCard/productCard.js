import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getDataForProductCard from '@salesforce/apex/ShopController.getDataForProductCard';

export default class productCard extends LightningElement {
    @track recordId = '';
    @track showModalWindowForm = false;

    @wire(CurrentPageReference)
    setRecordId(currentPageReference) {
        this.recordId = currentPageReference.state.id;
    }

    @wire(getDataForProductCard, {Id: '$recordId'}) productData;

    showPopUpForm(){
        this.showModalWindowForm = true;
    }

}

