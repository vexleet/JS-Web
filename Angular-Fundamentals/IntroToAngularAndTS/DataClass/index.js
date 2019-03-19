var HttpRequest = /** @class */ (function () {
    function HttpRequest(method, uri, version, message) {
        this.response = undefined;
        this.fulfilled = false;
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
    }
    return HttpRequest;
}());
var myData = new HttpRequest('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);
