/**
 * Spoon Proof of identity  
 * Copyright 2022-2023 Aigio1064 All Rights Reserved.
 */
function Spoon(type, ...arg) {
    switch (type) {
        case "verify":
            return ((key, raw, ...datas) => {
                let data = datas.flat(9999).join(".");
                let verify = (raw == Spoon.module.sign(key, data));
                return !!verify;
            })(...arg)
        case "buildjwt":
            return ((key, data) => {
                return Spoon.module.jwt(key, data);
            })(...arg)
        default:
            return [
                "verify",
                "buildjwt"
            ];

    };
};
Spoon.module = Spoon.prototype = {
    jwt(key, info) {
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
    sign(key, info) {
        let crypto = require("node:crypto");
        let hmac = crypto.createHmac("sha512", key);
        hmac.update(info);
        return hmac.digest().toString("base64");
    }
};
module.exports = Spoon;