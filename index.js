const parse = require('./dist/parser');
const app = require('./dist/app');

module.exports = async function (RED) {

    function ParserNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        const nodeContext = node.context();

        /**
         * TODO:
         * app.post('/', (req, res) => {
         *  res.send(await parse(req.body))
         * })
         * 
         * app.listen('config node-red')
         */

        node.on('input', async (msg) => {
            msg.payload = JSON.parse(msg.payload);
            msg.payload = await parse(msg.payload);

            node.send(msg);
        })
    }

    RED.nodes.registerType("Parser", ParserNode);
}