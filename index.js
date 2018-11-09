const {
    parse
} = require('./dist/parser');
const server = require('./dist/server');

module.exports = async function (RED) {

    function ParserNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        const nodeContext = node.context();

        server.close()
        server.listen(config.port)

        node.on('input', async (msg) => {
            msg.payload = await parse(msg.payload);

            node.send(msg);
        })
    }

    RED.nodes.registerType("Parser", ParserNode);
}