import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getDataForProductCard from '@salesforce/apex/ShopController.getDataForProductCard';

export default class productCard extends LightningElement {
    @track recordId = '';
    @track showModalWindowForm = false;

    @wire(CurrentPageReference)
    setRecordId(currentPageReference) {
        this.recordId = currentPageReference.state.id;
        if (this.recordId == null)
        {
            this.recordId = '01t5g0000045eFNAAY';
        };
    }

    @wire(getDataForProductCard, {Id: '$recordId'}) productData;

    showPopUpForm(){
        console.log('popup show ' + this.showModalWindowForm );
        this.showModalWindowForm = true;
        console.log('popup show ' + this.showModalWindowForm );
    }

}

