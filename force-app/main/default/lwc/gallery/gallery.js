import { LightningElement, track, wire } from "lwc";
import getDataForGallery from "@salesforce/apex/ShopController.getDataForGallery";

export default class gallery extends LightningElement {
    allProducts;
    numberProductsPerPage = 10;
    currentPageNumber = 1;
    @track  totalProducts;
    @track showFromTotal = this.numberProductsPerPage;
    @track products;


    @wire(getDataForGallery)
    getAllProducts(response){
        if(response.data){
            this.allProducts = response.data;
            this.products = this.allProducts.slice(0,this.numberProductsPerPage);
            this.totalProducts = this.allProducts.length;
        }else if (response.error){
            //handle
        }
    }
   
    paginateNext(){
        var previousProducts = this.currentPageNumber * this.numberProductsPerPage
        this.products = this.allProducts.slice(
            previousProducts,
            previousProducts + this.numberProductsPerPage
        );
        this.showFromTotal = previousProducts + this.numberProductsPerPage
        this.currentPageNumber += 1;
    }

    paginatePrev(){
        if(this.currentPageNumber == 1) return;

        var prevProducts = this.currentPageNumber * this.numberProductsPerPage;
        this.products = this.allProducts.slice(
            prevProducts - this.numberProductsPerPage * 2,
            prevProducts - this.numberProductsPerPage   
        );
        this.showFromTotal = prevProducts - this.numberProductsPerPage;
        this.currentPageNumber -= 1;
    }   
}
