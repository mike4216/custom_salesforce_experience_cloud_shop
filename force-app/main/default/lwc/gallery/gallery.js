import { LightningElement, track, wire } from "lwc";
import getDataForGallery from "@salesforce/apex/ShopController.getDataForGallery";
import getProductCount from "@salesforce/apex/ShopController.getProductCount"

export default class gallery extends LightningElement {
    allProducts = [];
    numberProductsPerPage = 10;
    currentPageNumber = 1;
    start = 1;
    dbQueryLImit = 0;
    @track totalProducts;
    @track showFromTotal = this.numberProductsPerPage;
    @track products;
    @track counter;

    constructor(){
        super();
        this.getProducts(this.dbQueryLImit);
    }

    @wire(getProductCount)
    getCount(response){
        if(response.data){
            this.totalProducts = response.data[0].counter;
        }else if (response.error){
            //handle
        }
    };

    getProducts(offset){
        this.dbQueryLImit = this.numberProductsPerPage * 5;
        var limits = [offset, this.dbQueryLImit]
        getDataForGallery({limits: limits})
            .then(result => {
                var first_page = this.allProducts.length == 0;
                this.allProducts.push.apply(this.allProducts, result);
                if(first_page){
                    this.products = this.allProducts.slice(0,this.numberProductsPerPage);
                }
            })
            .catch(error => {
                this.error = error;
                console.log(error);
            });
    }
   
    paginateNext(){
        if(this.showFromTotal > this.totalProducts){
            return;
        }
        var previousProducts = this.currentPageNumber * this.numberProductsPerPage
        this.products = this.allProducts.slice(
            previousProducts,
            previousProducts + this.numberProductsPerPage
        );
        this.showFromTotal = previousProducts + this.numberProductsPerPage
        this.currentPageNumber += 1;
        this.productObserver(previousProducts)
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
    
    productObserver(index, safeCount = 3){
        safeCount = this.numberProductsPerPage * safeCount;
        if (index + safeCount >= this.allProducts.length && this.allProducts.length < this.totalProducts){
            this.getProducts(this.allProducts.length);
        }
    }
}