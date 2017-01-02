var redis = require('redis');
var config = require('./config').redis;

var redis_helper = {
    GetRedisClient: () => {
        if (process.env.IS_DEBUG)
            return redis.createClient();
        else
            return redis.createClient(config.port, config.host);
    }
};

module.exports = redis_helper;
