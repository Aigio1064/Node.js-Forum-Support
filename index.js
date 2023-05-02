// 导入基本前置
var fs = require("node:fs");

//读基本 i18n 文件
var _i18n;
fs.readFile("i18nTranslation/default.json", "utf-8", (err, data) => {
    if (err) {
        console.error("Read defaule i18n translation file error, translation off.");
        return;
    };
    _i18n = JSON.parse(data);
})
//读配置
var _config;
fs.readFile("config.json", "utf-8", (err, data) => {
    if (err) {
        console.error("Read config error, server closed.");
        process.exit(1);
    };
    _config = JSON.parse(data);
});
//更新 i18n
var _i18n;
fs.readFile(`i18nTranslation/${_config.essential.i18n_translation}.json`, "utf-8", (err, data) => {
    if (err) {
        console.error(`Read i18n translation file ${_config.essential.i18n_translation} error, translation off.`);
        return;
    };
    _i18n = JSON.parse(data);
})
// 创建服务器
var _HttpServer;
if (_config.certificate.enable && _config.certificate.cert_file && _config.certificate.key_file) {
    _HttpServer = require("node:https");
} else {
    _HttpServer = require("node:http");
};
_HttpServer.createServer({ cert: _config.certificate.cert_file, key: _config.certificate.key_file }, (req, res) => {
    run_module(req,res);
}).listen(_config.essential.port,_config.essential.address);
//功能区
function run_module(req,res){
    var response_head = {
        "Access-Control-Allow-Origin":_config.essential.cors
    };
    
}