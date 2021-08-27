var Discord = require('discord.js')
var logger = require('winston');
var auth = require('./auth.json');
const https = require('https');
const {caption} = require("captionbot.js");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var client = new Discord.Client();
client.login(auth.token);

client.on('ready', function (evt) {
  logger.info('Connected');
});

client.on('message', function (message) {
  if (message.attachments.size > 0) {
    var url = message.attachments.first().url;
    //url = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/220px-President_Barack_Obama.jpg"
    console.log(url);
    caption(url)
    .then(imageCaption => message.channel.send(imageCaption))
    .catch(error =>message.channel.send("I don't know what this is or the attachment is not in an image format. WIP"));
  }
});