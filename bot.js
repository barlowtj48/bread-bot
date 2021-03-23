import { Client, Message } from "discord.js";
import { Baker } from "./Baker.js";
import { Bread } from "./Bread.js";
import { DataManager } from "./DataManager.js"

const client = new Client();
const TOKEN = process.env.DISCORD_BOT_TOKEN;

var dm = new DataManager();


client.on("message", async message => {
    if(message.author.bot) { return; }
    if(!message.guild) { return; }

    //DEBUG ONLY*****************************************************************************
    if(message.content === "killallroles"){
        let kill_these = ["breasant", "doughy-pauper", "yeasty-baker", "enlisted-baker", "bread-lord", "bread-pharoah"];
        message.guild.roles.cache.forEach(async role => {
        if(kill_these.find(killed => killed == role.name)) {
            await role.delete();
            console.log(`${role.name} has been deleted.`);
        }
    });
    return;
    }
    //END DEBUG******************************************************************************

    if(message.content.toLowerCase().startsWith("🍞")){
        //Check existence of server in the persistent data
        let bakery = dm.get_bakery(message.guild.id);
        if(!bakery) {
            await make_roles(message.guild).then(roles => {
                bakery = dm.add_bakery(message.guild.id, roles);
            });
        }

        //Check existence of user in the guild persistent data
        let baker = bakery.get_baker(message.author.id);
        if(!baker) {
            baker = dm.add_baker(message.guild.id, message.author.id);
        }
        
        //Need to check if bread is in progress already
        let val = message.content.toLowerCase().split(" ");
        if (val.length <= 1) { return; }
        let out_message =  `${message.author.toString()}\n`;
        let files = undefined;
        switch(val[1]) {
            case "check": //get status of current bread
                    if(baker.is_baking()){
                        out_message += baker.my_bread.get_status();
                        files = baker.my_bread.get_picture();
                    } else { 
                        out_message += "You need to start baking before you check the status of your bread.";
                    }
                break;


            case "bake": //start making bread
                if(!baker.is_baking()){
                    baker.make_bread();
                    out_message += baker.my_bread.get_description();
                    files = baker.my_bread.get_picture();
                } else {
                    out_message += "You can't bake more than one at a time right now.";
                }
                
                
                break;


            case "out": //takes bread out of the oven
                if(baker.is_baking()){
                    out_message +=  baker.my_bread.get_out_message();
                    baker.take_out_bread();
                    
                } else {
                    out_message +=  "You can't take bread out of the oven if there was never any there to begin with.";
                }
                break;


            case "bucks": //checks how much money you have
                out_message += `You currently have $${baker.balance}.`;
                break;


            default:
                break;
        }
        if(files){
            await message.channel.send(out_message,{
                files: [
                    files
                ]
            });
        } else {
            await message.channel.send(out_message);
        }
    }
});

async function make_roles(guild) {
    let roles = [];
    let tiers = ["breasant", "doughy-pauper", "yeasty-baker", "enlisted-baker", "bread-lord", "bread-pharoah"];
    
    for await (let tier of tiers) {
        await guild.roles.create({
            data : {
                name : tier, 
                hoist : true
            }
        }).then(role => roles.push(role));
    }
    return roles;
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // let bread = new Bread();
  });
  client.login(TOKEN);
  