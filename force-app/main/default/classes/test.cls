public with sharing class test {
    ProductCalloutHandler ph = new ProductCalloutHandler();
    String response = ph.createCallout();
    ph.createRecords(response);
    // ph.deletingProductsData();
    // System.debug(response);
    List<Product2> products = [select id from Product2];
    delete products;
    List<Cost__c> costs = [select id from Cost__c];
    delete costs;
}
