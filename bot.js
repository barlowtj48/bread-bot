import { Client } from "discord.js";
import { Baker } from "./Baker.js";
import { Bread } from "./Bread.js";
import { DataManager } from "./DataManager.js"

const client = new Client();
const TOKEN = process.env.DISCORD_BOT_TOKEN;

var baker = undefined

client.on("message", async message => {
    if(message.author.bot) { return; }
    if(!message.guild) { return; }

    if(message.content.toLowerCase().startsWith("🍞")){
        let val = message.content.toLowerCase().split(" ");

        if(!baker){
            baker = new Baker(message.author.id);
        }
        if(true){
            switch (val[1]){
                case "check": //checks on the bread
                    message.channel.send(baker.my_bread.get_status(),{
                        files: [
                            baker.my_bread.get_picture()
                        ]
                    });
                break;
                case "bake": //start making bread
                    baker.make_bread();
                    message.channel.send(baker.my_bread.get_description(),{
                        files: [
                            baker.my_bread.get_picture()
                        ]
                    });
                break;
                case "out": //takes bread out of the oven
                    let out_message = baker.my_bread.get_out_message();
                    baker.my_bread.sell();
                    message.channel.send(out_message);
                break;
                case "bucks": //checks how much money you have
                    message.channel.send(baker.balance);
                break;
            }
        }
    }   
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // let bread = new Bread();
  });
  client.login(TOKEN);
  