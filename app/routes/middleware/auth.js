const jwt = require('jsonwebtoken');
const authError = require("./authError")


module.exports = (req, res, next) => {
    
    let idToken = req.body.idToken || req.query.idToken || req.headers['idtoken']
    let accessToken = req.body.accessToken || req.query.accessToken || req.headers['authorization']


    // // check for public route
    let publicRoute = config.publicRoute;
    if (publicRoute.includes(req.originalUrl))
        return next();


    if (!(idToken && accessToken)) {
        return res.status(403).json({
            message: 'No token prvoided',
            success: false
        });
    }

    
    let options = { 
        algorithms: config.algorithm,
        issuer: config.issuer,
        audience: config.audience
    }
    

    jwt.verify(accessToken, config.secret, options, function (err, decoded) {
        if (err) 
            throw {
                name: 'UnauthorizedError', 
                status: 403, 
                massage: "token has expired"
            };
        
        if (decoded == undefined)
            throw {
                name: 'UnauthorizedError', 
                status: 403, 
                massage: "accessToken is not valid"
            };
    
        let has_scopes = decoded.scope === config.userScope;
        if (!has_scopes) 
            throw {
                name: 'UnauthorizedError', 
                status: 401, 
                massage: "permission denied"
            };
    });

    jwt.verify(idToken, config.secret, options, function (err, decoded) {
        if (err) 
            throw {
                name: 'UnauthorizedError', 
                status: 403, 
                massage: "token has expired"
            };
    
        
        if (decoded == undefined)
            throw {
                name: 'UnauthorizedError', 
                status: 403, 
                massage: "idToken is not valid"
            };

        req.decodedData = decoded;
        next();
    });

}


