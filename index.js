// 导入基本前置
var fs = require("node:fs");

// 配置项读取
var _config;
var _i18n;
fs.readFile("config.json", "utf-8", (err, data) => {
    if (err) {
        console.error("Read config error, server closed.");
        process.exit(1);
    };
    _config = JSON.parse(data);

    // i18n 翻译
    fs.readFile(`i18nTranslation/${_config.essential.i18n_translation}.json`, "utf-8", (err, data) => {
        if (err) {
            console.error(`Read i18n translation file ${_config.essential.i18n_translation} error, translation off.`);
            return;
        };
        _i18n = JSON.parse(data);
    });
});
// 启动服务器线程
ServerThread();

// 服务器线程
function ServerThread() {
    console.info(_i18n.server_starting)
    var _HttpServer;
    if (_config.certificate.enable && _config.certificate.cert_file && _config.certificate.key_file) {
        _HttpServer = require("node:https");
    } else {
        _HttpServer = require("node:http");
    };
    _HttpServer.createServer({ cert: _config.certificate.cert_file, key: _config.certificate.key_file }, (req, res) => {
        RunModule(req, res);
    }).listen(_config.essential.port, _config.essential.address);
    console.info(_i18n.server_start_success)
}

//功能区
function RunModule(req, res) {
    var response_head = {
        "Access-Control-Allow-Origin": _config.essential.cors
    };
    res.writeHead(200,Object.assign({"Content-Type":"application/json"},response_head));
    res.end(
        JSON.stringify({
            rawHeaders:req.rawHeaders,
            url:req.url,
            method:req.method
        })
        )
}