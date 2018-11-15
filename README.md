## The Node Master Class
## Homework Assignment #1

#### The Assignment:

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice. 

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.

#### Implementation
This example, hello world, API only accepts a POST request with a valid payload. 

It then responds with a JSON object that includes they request payload, request headers and a random message 
from the randomGreeting module in greetings.js.

If a different type of request is made, then the server responds with a 404 status code and an useful error 
message.


#### To Run The Server:
1. clone repo and cd it
2. run `$ node index.js` from the hello directory
3. make different types of requests to the server via localhost:4000/hello
