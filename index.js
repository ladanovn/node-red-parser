module.exports = async function (RED) {

    function ParserNode(config) {
        const brokerConnection = RED.nodes.getNode(config.broker);
        process.env.BROKER = JSON.stringify(brokerConnection);
        process.env.PARSER_CONFIG = JSON.stringify(config);

        const server = require('./dist/server');
        const {
            parse
        } = require('./dist/parser');
        const {
            handle
        } = require('./dist/handler')

        RED.nodes.createNode(this, config);

        const node = this;
        const nodeContext = node.context();

        server.close()
        server.listen(config.port)

        node.on('input', async (msg) => {
            msg.payload = await parse(msg.payload);
            msg.payload = await handle(msg.payload)
            node.send(msg);
        })
    }

    RED.nodes.registerType("Parser", ParserNode);
}