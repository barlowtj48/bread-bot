import { readFileSync, writeFileSync, existsSync } from "fs";

export class SaveManager {
    constructor(){
        this.guilds = []
    }

    add_guild(guild_id, roles) {
      let basic_roles = {}
      roles.forEach(role => {
        basic_roles[role.name] = role.id;
      });
        this.guilds.push({
            "id" : guild_id, 
            "roles" : basic_roles,
            "bakers" : []
        });
        this.write_data();
    }

    add_member(guild_id, baker) {
      let guild = this.guilds.find(guild => guild.id === guild_id);
      let member = {
          "id" : baker.id,
          "balance" : baker.balance, 
          "burned" : baker.burned,
          "successful" : baker.successful,
          "total_earned" : baker.total_earned
      }
      guild.bakers.push(member);
      this.write_data();
    }

    read_data() {
      if(!existsSync("./data.json")){
        writeFileSync("./data.json", "[]");
      }
      let data = readFileSync("./data.json");
      if(!data){
        console.log("Error reading data.");
      } else if(data.length == 0) {
        writeFileSync("./data.json", "[]");
      }
      data = JSON.parse(data);
      if(data == undefined){
        this.guilds = [];
        return [];
      }
      this.guilds = data;
      return data;
      }

      write_data() {
        let a = writeFileSync("./data.json", JSON.stringify(this.guilds, null, 2));
        console.log(a);
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
}