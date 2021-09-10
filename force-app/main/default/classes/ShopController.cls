public with sharing class ShopController {
	@AuraEnabled(cacheable=true)
	public static List<Product2> getDataForGallery(){
		return [
			SELECT Id, Name, Price__c, thumb__c 
			FROM Product2
		];
	}

	@AuraEnabled(cacheable=true)
	public static List<Product2> getDataForProductCard(String Id){
		return [
			SELECT Id, Name, Price__c, image__c, Description
			FROM Product2
			WHERE Id = :Id
		];
	}

	@AuraEnabled
	public static List<Product2> getDataForCart(List<String> ids){
		return [
			SELECT Id, Name, Price__c, image__c, Description
			FROM Product2
			WHERE Id IN :Ids
		];
	}
}
