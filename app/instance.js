var io = null;
var redisClient = null;
var mySqlCon = null;




module.exports.setRedis = _redisClient => {
    redisClient = _redisClient;
}

module.exports.getRedis = () => {
    return redisClient;
}


module.exports.setMySqlCon = _mySqlCon => {
    mySqlCon = _mySqlCon;
}


module.exports.getMySqlCon = () => {
    return mySqlCon;
}






