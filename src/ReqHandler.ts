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

    constructor (RED, currNode) {
        this.RED = RED;
        this.currNode = currNode;
        this.initServer();
        this.initCurrNode();
    }

    listenServer(config: Object) {
        this.server.close();
        this.server.listen(config);
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
        const app = express();
        app.use(
            bodyParser.urlencoded({
                extended: false
            })
        );
        app.use(bodyParser.json());

        app.post("/", async (req, res) => {
            const result = await this.handleReq(req.body);
            res.send(result);
        });

        this.server = http.createServer(app);
    }

    private initCurrNode() {
        this.currNode.on('input', async (msg) => {
            msg.payload = await this.handleReq(msg.payload);
            this.currNode.send(msg);
        });
    }
    
}