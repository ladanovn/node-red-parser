module.exports = async function (RED) {

    function ParserNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        const nodeContext = node.context();

        node.on('input', async (msg) => {
            msg.payload = JSON.parse(msg.payload);
            msg.payload = await parse(msg.payload);

            node.send(msg);
        })
    }

    RED.nodes.registerType("Parser", ParserNode);
}