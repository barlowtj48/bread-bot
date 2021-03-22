import { Client } from "discord.js";
import { Bread } from "./Bread.js";
import { DataManager } from "./DataManager.js"

const client = new Client();
const TOKEN = process.env.DISCORD_BOT_TOKEN;

client.on("message", async message => {
    if(message.author.bot) { return; }
    if(!message.guild) { return; }

    let val = message.content.toLowerCase().split(" ");

    if(val[0] == "🍞" && val.length > 1){
        if(baker.is_baking()){
            let bread = baker.my_bread;
            switch (val[1]){
                case "check": //checks on the bread
                    message.channel.send(bread.get_status(),{
                        files: [
                            bread.get_picture()
                        ]
                    });
                break;
                case "out": //takes bread out of the oven
                    let out_message = bread.get_out_message();
                    bread.sell();
                    message.channel.send(out_message);
                break;
                case "bucks": //checks how much money you have
                    message.channel.send(baker.balance);
                break;
            }
        }
        else{
            switch (val[1]){
                case "bake": //start making bread
                    baker.make_bread();
                    message.channel.send(bread.get_description(),{
                        files: [
                            bread.get_picture()
                        ]
                    });
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
  