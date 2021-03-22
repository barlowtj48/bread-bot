export class Bakery {
    constructor(guild_id, roles){
        this.id = guild_id;
        this.roles = {
            "breasant" : roles[0],
            "doughy-pauper" : roles[1],
            "yeasty-baker" : roles[2],
            "enlisted-baker" : roles[3],
            "bread-lord" : roles[4],
            "bread-pharoah" : roles[5]
        };
        this.bakers = [];
    }

    get_baker(id){
        return this.bakers.find(baker => baker.id === id);
    }
    
}