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
    take_out_bread(){
        let profit = this.my_bread.sell();
        
        if(profit == this.my_bread.value){
            this.successful += 1;
            this.balance += value;
            this.total_earned += value;
        } else if(profit == -this.my_bread.value) {
            this.burned += 1;
            this.balance -= this.my_bread.value;
        } else {
            this.balance += profit;
            this.total_earned += profit;
        }
        this.my_bread = undefined;
    }
}