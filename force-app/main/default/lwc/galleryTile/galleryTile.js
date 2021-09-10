import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class GalleryTile extends  NavigationMixin(LightningElement) {
    @api product;
    
    navigateToWebPage() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'product_custom_page__c'
            }, 
            state: {
                'id': this.product.Id
            }
        })
    }

    updateCounter(event){
        console.log('galleryTile ' + event.detail);
        this.dispatchEvent(new CustomEvent("counterchange", {
            detail: event.detail
        }));
    }
}