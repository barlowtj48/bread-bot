import { Bread } from "./Bread.js";


export class Baker { 
    constructor(id){
        this.id = id;
        this.balance = 0;
        this.burned = 0;
        this.successful = 0;
        this.total_earned = 0;
        this.my_bread = undefined;
    }
    make_bread(){
        this.my_bread = new Bread();
    }
    is_baking(){
        return this.my_bread != undefined;
    }
}