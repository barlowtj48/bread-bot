import { readFile, writeFile, existsSync } from "fs";

export class SaveManager {
    constructor(){
        this.guilds = []
    }

    add_guild(guild_id, roles) {
        this.guilds.push({
            "id" : guild_id, 
            "roles" : roles,
            "bakers" : []
        });
        this.write_data();
    }

    add_member(guild_id, baker) {
        let guild = this.guilds.find(guild => guild.id === guild_id);
        member = {
            "id" : baker.id,
            "money" : baker.balance, 
            "burned" : baker.burned,
            "successful" : baker.successful,
            "total_earned" : baker.total_earned
        }
        guild.push(member);
        this.write_data();
    }

    read_data() {
        readFile("./data.json", (err, data) => {
          console.log("Reading data...");
          if (err) {
            if (existsSync("./data.json")) {
              console.log("Data unable to be read.");
            } else{
              writeFile("data.json", "[]", function (err) {
                if (err) return console.log(err);
                console.log('data.json was created.');
              });
            }
            
          } else if (JSON.parse(data) == undefined) {
            this.guilds = [];
            console.log(JSON.stringify(guilds, null, 2));
          } else {
            this.guilds = JSON.parse(data);
          }
        });
      }

      write_data() {
        writeFile("data.json", JSON.stringify(guilds, null, 2), err => {
          if (err) {
            console.log("Data was unable to be written.");
          } else {
            let d = new Date();
            console.log(
              d.getDate() +
                ":" +
                d.getHours() +
                ":" +
                d.getMinutes() +
                ":" +
                d.getSeconds() +
                ";   Data updated"
            );
          }
        });
      }
}