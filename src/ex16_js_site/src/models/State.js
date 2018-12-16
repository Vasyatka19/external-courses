export let State = function State(){

}
State.prototype.makeRequest = function makeRequest(url,callback) {
	const httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
    }
    let response;
	httpRequest.onreadystatechange = function() { loadContents(httpRequest,callback); };
	httpRequest.open('GET', url, true);
    httpRequest.send('');


    function loadContents(httpRequest,callback) {
        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200) {
                callback(JSON.parse(httpRequest.response));
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}