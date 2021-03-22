import { inherits } from "node:util";
import { get_loaf } from "./utils.js";


export class Bread {
    constructor() { // get number of types of bread and pick from the selection
        this.loaf = get_loaf(); //refers directly to the json files that hold all of the information
        this.state = 0;
        this.start_time = new Date().getTime();

        let len = this.loaf.images.length;
        this.value = new Array(len).fill(0)
        this.value[len-1] = -value;
        this.value[len-2] = value;
        this.value[len-3] = 1;
    }

    get_status(){
        let now = new Date().getTime();
        let difference = now - this.start_time;
        if(this.state > this.loaf.images.length-1){
            return this.loaf.state_description[this.loaf.images.length-1];
        }
        else{
            this.state += Math.floor(difference/120000); //change state every 2 minutes until end of states
            return this.loaf.state_description[this.state];
        }
    }

    get_picture(){
        let dir = process.cwd();
        return dir + "/bread_pics/" + this.loaf.folder_name + this.loaf.images[this.state];
    }

    get_out_message(){
        return this.loaf.state_description[this.state];
    }

    sell(){
        return this.value[this.state];
    }

    



}

