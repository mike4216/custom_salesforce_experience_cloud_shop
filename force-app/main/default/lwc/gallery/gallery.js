import { LightningElement, wire } from "lwc";
import getDataForGallery from "@salesforce/apex/ShopController.getDataForGallery";

export default class gallery extends LightningElement {
    @wire(getDataForGallery) products;
   
}
