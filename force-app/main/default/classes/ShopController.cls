public with sharing class ShopController {
	@AuraEnabled(cacheable=true)
	public static List<Product2> getDataForGallery(List<Integer> limits){
		System.debug(limits);
		return [
			SELECT Id, Name, Price__c, thumb__c 
			FROM Product2
			LIMIT :limits[1] OFFSET :limits[0]
		];
	}

	@AuraEnabled(cacheable=true)
	public static List<AggregateResult> getProductCount(){
		return [
			SELECT COUNT(Id) counter FROM Product2
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

	@AuraEnabled
	public static void saveOrder(String json){
		statistic__c customerStatictic = new statistic__c();
		System.debug(json);
		Map<String, Object> orderDetails = (Map<String, Object>)System.JSON.deserializeUntyped(json);
	
		customerStatictic.customer_first_name__c = (String)orderDetails.get('first_name');
		customerStatictic.customer_last_name__c = (String)orderDetails.get('last_name');
		customerStatictic.order_price__c = (Decimal)orderDetails.get('order_cost');
		customerStatictic.product_name__c = System.JSON.serialize(orderDetails.get('ids'));
		System.debug(customerStatictic);
		insert customerStatictic;
	}
}