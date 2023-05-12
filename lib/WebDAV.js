/**
 * WebDAV support  
 * Copyright 2022-2023 Aigio1064 All Rights Reserved.
 */
function WebDAV(Url, options) {
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
    this.get = (path="/", callback) => {
        return this.request(Url + path, Object.assign({method:"GET"},options), callback);
    };
    this.propfine = (path="/", callback) => {
        return this.request(Url + path, Object.assign({method:"PROPFIND"},options), callback);
    };
    this.mkcol = (path="/", callback) => {
        return this.request(Url + path, Object.assign({method:"MKCOL"},options), callback);
    };
    this.delete = (path="/", callback) => {
        return this.request(Url + path, Object.assign({method:"DELETE"},options), callback);
    };
    this.put = (path="/", data="", callback) => {
        return this.request(Url + path, Object.assign({method:"DELETE",postdata:data},options), callback);
    };
};
module.exports = WebDAV;