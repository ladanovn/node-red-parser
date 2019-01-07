## Node-red-parser
Simple node-red plugin for defining and processing commands from input of node or from HTTP request.

### Installation
1. Clone this repository: `git clone https://github.com/ladanovn/node-red-parser.git`
2. Install the necessary dependencies in node-red-parser.     
   `cd node-red-parser`       
   `npm install`
3. Install this from $HOME/.node-red.     
   For example, `npm install <path where are you cloning the repo>/node-red-parser`
4. Run the node-red, add this node.
  ![screenshot](https://i.ibb.co/fpYD5kv/Node-red.png)
  
  ### About
  1. Device information is taken from other nodes of node-red.      
     In this case, used 'sonoff device' from 'node-red-contrib-sonoff-tasmota'.
  2. It may works with [alisa-driver](https://github.com/ladanovn/node-red-alisa-driver).
 
 ### Format input data
 1) Using inject node.      
 ```
    {         
      "sender": {     
          "type": "text"      
      },      
      "source_text": "Включить свет в спальне"    
    }
```
  2) POST `localhost/:<node port>`        
  Node port by default is 3001, but you can change in node properties
