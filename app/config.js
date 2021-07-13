const path = require('path')

module.exports = {
    secret: 'kfnkmFVTGKJd345mohsenp69^&$#$%ijdfm(*&reihaneh^%$#dfvawdqacfdCVBNM<POIUY',
    salt: 10,
    audience: "audience",
    algorithm: "HS256",
    issuer: "issuer",
    accesssTokenExpire: 60 * 60,
    idTokenExpire: 60 * 60 * 100,
    verificationCodeUnit: 'm',
    verificationCodeDuration: 30,
    userScope: "user",
    deviceScope: "device",
    publicRoute: [
        '/api/user/v1/',
        '/api/user/v1/login', 
        '/api/user/v1/login/mobile', 
        '/api/user/v1/login/mobile/check', 
        '/api/device/v1/', 
        '/api/'
    ],
    path: {
        controllers: {
            root: path.resolve('./app/controllers'),
            user: path.resolve('./app/controllers/user'),
            device: path.resolve('./app/controllers/device')
        },
        models: {
            root: path.resolve('./app/models/'),
            error: path.resolve('./app/models/error')
        },
        transforms: path.resolve('./app/transforms'),
        mainController: path.resolve('./app/controllers/MainController'),
        instance: path.resolve('./app/instance')
    }
}