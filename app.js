var redis = require('redis');
var redisHelper = require('./common/redis_helper');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var os = require('os');

var client = redisHelper.GetRedisClient();
const port = 3002;

var healthData = {
    svcName: 'Stream Timer',
    host: os.hostname(),
    port: port,
    status: 'green'
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/common/index.html');
});

app.get('/health', (req, res) => {
    res.status(200).send(JSON.stringify(healthData));
});

client.on("message", (channel, message) => {
    if (process.env.IS_DEBUG)
        console.log("sub channel " + channel + ": " + message);
        
    io.emit('timersub', message);
});

client.subscribe('ScoreBoard_timer');

server.listen(port, ()=> {
    console.log('pp-timer-svc running at http://localhost:' + port);
});