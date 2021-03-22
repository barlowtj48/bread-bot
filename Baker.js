import { Bread } from "Bread.js";


class Baker { 
    constructor(member_id){
        this.member_id = member_id;
        this.my_bread = undefined;
    }
    make_bread(){
        this.my_bread = new Bread();
    }
    is_baking(){
        return this.my_bread != undefined;
    }

}