public class BulkApiProductHandler {
	private String sessionId;
	private String orgDomain;

	public BulkApiProductHandler() {
		this.sessionId = UserInfo.getSessionId();
		this.orgDomain = URL.getOrgDomainUrl().toExternalForm();
	}

	public String getProductsJson(){
		StaticResource staticResource = [SELECT Body FROM StaticResource WHERE Name = 'products_json'];
		return staticResource.Body.toString();
	}

	public void createJob(){
		String body = '<?xml version="1.0" encoding="UTF-8"?> <jobInfoxmlns="http://www.force.com/2009/06/asyncapi/dataload"> <operation>insert</operation> <object>Account</object> <contentType>json</contentType> </jobInfo>';
		Map<String, String> headers = new Map<String, String>{
			'Content-Type'=>'text/xml; charset=UTF-8',
			'Accept' => 'text/xml'
		};
		headers.put('X-SFDC-Session', this.sessionId);
		HttpRequest req = prepareHttpRequest(orgDomain + '/services/async/51.0/job', 'POST', body, headers);
		System.debug(send(req));
	}

	private HttpRequest prepareHttpRequest(String endPoint, String method, String body, Map<String, String> headers){
		HttpRequest req = new HttpRequest();
		req.setEndpoint(endPoint);

		for (String key: headers.keySet()){
			req.setHeader(key, headers.get(key));
			System.debug(headers.get(key));
		}
		req.setHeader('Content-Type','text/xml; charset=UTF-8');
		req.setMethod(method);
		if(body != null ) req.setBody(body);
		System.debug(req);
		return req;
	}

	private HttpResponse send(HttpRequest req){
		Http http = new Http();
		return http.send(req);
	}
}