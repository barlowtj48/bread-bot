//revise structure::
/*
Guilds:
    Guild:
        Roles:
            Role1
            Role2
        Bakers:
            Baker:
                ID
                Bread:
                    etc
                Money
                Burned
                Succeeded
                

*/

class DataManager {
    constructor(){
        this.guilds = []
    }
    add_guild(guild_id) {
        this.guilds.push(guild_id);
    }
    add_member(guild_id, member_id) {
        let guild = this.guilds.find(guild => guild.id == guild_id);
        guild.push(new_member(member_id));)
    }
    new_member(member_id) {
        return {member_id : {
            "money" : 0,
            "num_burned" : 0,
            "bread" : {}, 

        }}
    }

    get_baker(guild_id, member_id) {
        let baker = this.guilds.bakers.find(baker => baker.id == member_id);
        if(baker == undefined) {

        }
    }
}