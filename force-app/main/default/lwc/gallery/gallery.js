import { LightningElement, track, wire } from "lwc";
import getDataForGallery from "@salesforce/apex/ShopController.getDataForGallery";
import getProductCount from "@salesforce/apex/ShopController.getProductCount"

export default class gallery extends LightningElement {
    allProducts;
    numberProductsPerPage = 10;
    currentPageNumber = 1;
    start = 1;
    dbQueryLImit = 100;
    @track totalProducts;
    @track showFromTotal = this.numberProductsPerPage;
    @track products;
    @track counter;
    @track showModalWindowForm = false;

    @wire(getProductCount)
    getCount(response){
        if(response.data){
            this.totalProducts = response.data[0].counter;
        }else if (response.error){
            //handle
        }
        this.getProducts(this.start, 100)
        console.log('products')
    };


    getProducts(start, limit){
        var limits = [start, start * limit]
        getDataForGallery({limits: limits})
            .then(result => {
                this.products = result;
            })
            .catch(error => {
                this.error = error;
                console.log(error);
            });
        console.log(this.products);
    }


    // @wire(getDataForGallery)
    // getProducts(response){
    //     if(response.data){
    //         this.allProducts = response.data;
    //         this.products = this.allProducts.slice(0,this.numberProductsPerPage);
    //         // this.totalProducts = this.allProducts.length;
    //     }else if (response.error){
    //         //handle
    //     }
    // }
   
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
    
    updateCounter(event){
        console.log('gallery' + event.detail);
        this.counter = event.detail;
        console.log('counter ' + this.counter);
    } 

    // showModal(){
    //     this.showModalWindowForm = true;
    // }
}
