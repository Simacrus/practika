const crypto = require(`crypto`);

function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function hashPassword(password) {
    return crypto.createHash(`sha256`)
        .update(password)
        .digest(`hex`)
}

module.exports = { getReqData, hashPassword };