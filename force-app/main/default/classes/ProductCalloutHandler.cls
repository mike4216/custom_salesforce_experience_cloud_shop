public class ProductCalloutHandler {
	static final String SHOP_URL = 'https://612f34a95fc50700175f14ce.mockapi.io/olololo';
	Integer margin = 20;

	public String createCallout(){
		Http http = new Http();

		HttpRequest req = new HttpRequest();
		req.setEndpoint(SHOP_URL);

		req.setHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,' +
				'image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9');
		req.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
				'(KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36');
		req.setMethod('GET');

		HttpResponse resp = http.send(req);

		return resp.getBody();
	}

	public void createRecords(String jsonString){
		List<Product2> insertList = new List<Product2>();
		List<Cost__c> costs = new List<Cost__c>();
		for (Object obj : (List<Object>)JSON.deserializeUntyped(jsonString)) {
			Map<String, Object> productItemProperties = (Map<String, Object>)obj;
			for(String fieldName : productItemProperties.keySet()) {
				Product2 productForSave = new Product2();
				productForSave.Name = (String)productItemProperties.get('Name');
				// productForSave.ExternalId = (String)productItemProperties.get('id');
				productForSave.image__c = (String)productItemProperties.get('image');
				productForSave.thumb__c = (String)productItemProperties.get('thumb');
				productForSave.Description = (String)productItemProperties.get('description');
				Decimal price = calculatePrice(
					Decimal.valueOf(Double.valueOf((productItemProperties.get('Price'))))
				);
				productForSave.Price__c = price;
				costs.add(new Cost__c(margin__c = this.margin, cost__c = price)
				);
				insertList.add(productForSave);
			}
			
		}
		insert insertList;
		insert costs;

		if (insertList.size() == costs.size()) {
			for (Integer i = 0; i < insertList.size(); i++) {
				insertList[i].Cost__c = costs[i].Id;
			}
			update insertList;
		}else{
			// todo info
		}
	}

	public Double calculatePrice(Decimal price){
		if(price != null && price > 0){
			price = ((price * this.margin) / 100).setScale(2);
		}
		return price;
	}

	public Boolean deletingProductsData(){
		List<Product2> products = [SELECT id FROM Product2];
		delete products;
		List<Cost__c> costs = [SELECT id FROM Cost__c];
		delete costs;
		return checkData();
	}

	public Boolean checkData(){
		List<Product2> products = [SELECT id FROM Product2];
		List<Cost__c> costs = [SELECT id FROM Cost__c];
		return products.size() == 0 && costs.size() == 0;
	}
}