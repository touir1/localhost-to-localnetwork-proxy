var http = require('http'),
    httpProxy = require('http-proxy');
var os = require('os');

var internalPort = 8888;
var externalPort = 8888;
var computerName = os.hostname();

if(process.argv.length>2){
	if(process.argv.length==3){
		internalPort = externalPort = process.argv[2];
	}
	else if(process.argv.length==4){
		internalPort = process.argv[2];
		externalPort = process.argv[3];
	}
}

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://127.0.0.1:'+internalPort });
});

console.log('\nServer is running');
console.log('A tunnel between http://'+computerName+':'+externalPort+' and http://127.0.0.1:'+internalPort+' was created');
server.listen(externalPort,"0.0.0.0");