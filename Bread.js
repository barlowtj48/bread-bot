import { inherits } from "node:util";
import { get_loaf } from "./utils.js";


export class Bread {
    constructor() { // get number of types of bread and pick from the selection
        this.loaf = get_loaf(); //refers directly to the json files that hold all of the information
        this.state = 0;
    }

    get_status(){
        return this.loaf.state_description[this.state];
    }

    get_picture(){
        let dir = process.cwd();
        return dir + "/bread_pics/" + this.loaf.folder_name + "/" + this.loaf.images[this.state];
    }
}

