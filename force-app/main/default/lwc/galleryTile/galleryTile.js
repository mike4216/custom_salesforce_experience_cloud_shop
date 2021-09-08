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
}