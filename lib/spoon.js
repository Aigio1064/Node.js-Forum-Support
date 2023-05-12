/**
 * Spoon Proof of identity  
 * Copyright 2022-2023 Aigio1064 All Rights Reserved.
 */
function Spoon(type, ...arg) {
    switch (type) {
        case "compare":
        case "比较":
            return (arg[0] == arg[1]);
        case "encrypt":
        case "加密":
            return Spoon.module.jwt(arg[0], arg[1]);
        case "base64":
            let buffer = require("node:buffer");
            switch (true) {
                case (arg[0] == "encode" || arg[0] == "编码"):
                    return buffer.btoa(arg[1]);
                case (arg[0] == "decode" || arg[0] == "解码"):
                    return buffer.atob(arg[1]);
                default:
                    return undefined;
            };
        default:
            return [
                "compare|比较",
                "encrypt|加密",
                "base64"
            ];

    };
};
Spoon.module = Spoon.prototype = {
    jwt(info, key) {
        let Buffer = require("node:buffer");
        let header = {
            typ: "JWT",
            alg: "HS512"
        };
        let HeaderStr = Buffer.Buffer.from(JSON.stringify(header)).toString("base64");
        let PayloadStr = Buffer.Buffer.from(JSON.stringify(info)).toString("base64");
        let SingStr = this.sign(`${HeaderStr}.${PayloadStr}`, key);
        return `${HeaderStr}.${PayloadStr}.${SingStr}`
    },
    sign(info, key) {
        let crypto = require("node:crypto");
        let hmac = crypto.createHmac("sha512", key);
        hmac.update(info);
        return hmac.digest().toString("base64");
    }
};
module.exports = Spoon;