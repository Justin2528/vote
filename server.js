const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { RichEmbed, Client } = require('discord.js');
const { get } = require('superagent');

const client = new Client();
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, { webhookPort: 5000, webhookAuth: 'jy5125250' });

dbl.webhook.on('ready', hook => {
  console.log(`DBL Webhook running with path http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', async vote => {
  const { body } = await get(`https://hd-development.glitch.me/api/fetchUser?id=${vote.user}`);
  let embed = new RichEmbed() 
  .setColor('RANDOM') 
  .setThumbnail(body.avatarURL)
  .setAuthor('EDGE vote Webhook', 'https://cdn.discordapp.com/emojis/338808864352763904.png') 
  .setDescription(`***${body.tag}*** Just voted EDGE\nWith ID: ${vote.user}`)
  .setTimestamp();
  client.channels.get('528781217274003470').send(embed);
  console.log(`User with ID ${vote.user} just voted!`);
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log(client.user.username + "online");
})