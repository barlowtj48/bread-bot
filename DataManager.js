import { Baker } from "./Baker.js";
import { Bakery } from "./Bakery.js";
import { SaveManager } from "./SaveManager.js";


export class DataManager {
    constructor(){
        this.sm = new SaveManager();
        let data = this.sm.read_data();
        this.bakeries = [];
        this.correct_data(data);
    }

    add_bakery(guild_id, roles) {
        let new_guild = new Bakery(guild_id, roles);
        this.bakeries.push(new_guild);
        this.sm.add_guild(new_guild.id, roles);
        return new_guild;
    }

    add_baker(guild_id, member_id) {
        let guild = this.get_bakery(guild_id);
        let baker = new Baker(member_id);
        this.sm.add_member(guild_id, baker);
        guild.bakers.push(baker);
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

    correct_data(data) {
        let corrected = [];
        for (let bakery of data) {
            let roles_array = []
            Object.keys(bakery.roles).forEach(function(key, index){
                roles_array.push(bakery.roles[key]);
            });
            let temp_bakery = new Bakery(bakery.id, roles_array);
            for (let baker of bakery.bakers) {
                let temp_baker = new Baker(baker.id);
                temp_baker.balance = baker.balance;
                temp_baker.burned = baker.burned;
                temp_baker.successful = baker.successful;
                temp_baker.total_earned = baker.total_earned;
                temp_bakery.bakers.push(temp_baker);
            }
            corrected.push(temp_bakery);
        }
        this.bakeries = corrected;
    }
}