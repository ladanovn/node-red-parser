const server = require('./dist/server');
const {
    parse
} = require('./dist/parser');

const {
    handle
} = require('./dist/handler')


module.exports = async function (RED) {

    function ParserNode(config) {
        process.env.PARSER_CONFIG = JSON.stringify(config);
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