/**
 * WebDAV support
 * Copyright 2022-2023 Aigio1064 All Rights Reserved.
 */
function WebDAV(root, options) {
    var http = require(`node:http`);
    this.request = (url, options, callback) => {
        var _data;
        var _get = http.request(url, options,(res)=>{
            res.on("data", (chunk) => {
                _data += chunk;
            });
            res.on("end", () => {
                callback(_data, _get);
            });
        });
        if (options.postdata){
            _get.write(options.postdata);
        };
        _get.end();
    };
    this.PROPFIND = (path="/", callback) => {
        return this.request(root + path, Object.assign({method:"PROPFIND"},options), callback);
    }
};
module.exports = WebDAV;