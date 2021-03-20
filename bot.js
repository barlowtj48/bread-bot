import { Client } from "discord.js";
import { Bread } from "./Bread.js";

const client = new Client();
const TOKEN = process.env.DISCORD_BOT_TOKEN;

client.on("message", async message => {
    if(message.author.bot) { return; }
    if(!message.guild) { return; }
    
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let bread = new Bread();
  });
  client.login(TOKEN);
  