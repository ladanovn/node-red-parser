import { Node, Red } from 'node-red';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';

import { parse } from './parser';
import { handle } from './handler';
import { Server } from 'http';

const TYPE_SRC_NODE = 'Sonoff device';

module.exports = class ReqHandler {
    RED: Red;
    currNode: Node;
    server: Server;
    app: express.Application

    constructor (RED, currNode) {
        this.RED = RED;
        this.currNode = currNode;
        this.initServer();
        this.initCurrNode();
    }

    async listenServer(config: Object) {
        this.server.listen(config);
    }    

    async closeServer() {
        await this.server.close((err)=> console.log(err));
    }

    private async handleReq (msg) {
        let result = await parse(msg);
        result = await handle(result, this.nodes);

        return result;
    }

    private get nodes(): Object[] {
        const nodeInfoArray = [];

        this.RED.nodes.eachNode(function(node) {
            let nodeInfo = null;
            
            if (TYPE_SRC_NODE.length == 0 || node.type === TYPE_SRC_NODE) {
                nodeInfo = node;
            }
            
            if (nodeInfo != null) {
                nodeInfoArray.push(nodeInfo);
            }                
        });

        return nodeInfoArray;
    }

    private initServer() {
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.post("/", async (req, res) => {
            if (!req.body) return res.sendStatus(400);
            const result = await this.handleReq(req.body);
            res.send(result);
        });
        
        this.server = http.createServer(this.app);
    }

    private initCurrNode() {
        this.currNode.on('input', async (msg) => {
            msg.payload = await this.handleReq(msg.payload);
            this.currNode.send(msg);
        });

        this.currNode.close = async function(){
            await this.closeServer();
        }.bind(this);
    }
    
}