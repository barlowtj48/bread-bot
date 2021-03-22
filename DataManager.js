import { Baker } from "./Baker.js";
import { Bakery } from "./Bakery.js";
import { SaveManager } from "./SaveManager.js";


export class DataManager {
    constructor(){
        this.sm = new SaveManager();
        this.bakeries = this.sm.read_data();
    }

    add_bakery(guild_id, roles) {
        let new_guild = new Bakery(guild_id, roles);
        this.bakeries.push(new_guild);
        this.sm.add_guild(new_guild, roles);
        return new_guild;
    }

    add_baker(guild_id, member_id) {
        let guild = this.get_bakery(guild_id);
        let baker = new Baker(member_id);
        this.sm.add_member(guild_id, baker);
        guild.push(baker);
        return baker;
    }

    get_bakery(guild_id){
        if(!this.bakeries){
            return undefined;
        }
        return this.bakeries.find(bakery => bakery.id === guild_id);
    }

    get_role(guild_id, role_name) {
        let bakery = this.get_bakery();
        return bakery.get_role(role_name);
    }


}