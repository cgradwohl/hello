const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const randomGreeting = require('./greetings');

const httpServer = http.createServer((req, res) => {
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    
    // get the path from that url
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // get the http method
    const method = req.method.toLowerCase();

    // get the headers as an object
    const headers = req.headers;

    // get the payload, if payload exists
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    // payload of the req is being streamed in via the data event
    // this is a node js stream
    req.on('data', (data) => {
        buffer += decoder.write(data)
    });

    // end gets called for every request regarless if it has payload
    req.on('end', () => {
        buffer += decoder.end();

        // choose the handler this req should go to 
        const chosenHandler = typeof(router[trimmedPath]) == 'undefined' ? handlers.notFound : handlers[trimmedPath];
        
        // construct data obj to send to handler
        const data = {
            'trimmedPath': trimmedPath,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        // route the request to the correct handler
        chosenHandler(data, (statusCode, payload) => {
            // use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 404;
            
            // use the payload called back by the handler, or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // convert the payload to a string
            const payloadString = JSON.stringify(payload);

            // return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        }); 
    });
});

httpServer.listen(4000, () => {
    console.log("the server is listening on port 4000");
});

// define our handlers
const handlers = {}
handlers.notFound = (data, callback) => {
    callback(404);
};

// only accepts a POST requests and responds with a random greeting and some request information
// responds with a helpful error message otherwise
handlers.hello = (data, callback) => {
    if(data.method == 'post'){
        callback(200, {
            "message" : randomGreeting(),
            "request": {
                "headers": data.headers,
                "payload": data.payload
            }
        });
    } else {
        callback(404, {"error" : "this api only accepts POST requests, but you made a " + data.method.toUpperCase() + " request"})
    };
};

// define a request router
const router = {
    "hello" : handlers.hello
};