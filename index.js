module.exports = async function (RED) {

    function ParserNode(config) {
        const brokerConnection = RED.nodes.getNode(config.broker);
        process.env.BROKER = JSON.stringify({
            host: brokerConnection.host,
            port: brokerConnection.port,
            credentials: {
                user: brokerConnection.credentials.user,
                password: brokerConnection.credentials.password
            } 
        });
        process.env.PARSER_CONFIG = JSON.stringify(config);
        RED.nodes.createNode(this, config);
        
        const node = this;
        const nodeContext = node.context();
        const ReqHandler = require('./dist/ReqHandler');
        const reqHandler = new ReqHandler(RED, node);
        reqHandler.listenServer(config.port);
    }

    RED.nodes.registerType("Parser", ParserNode);
}