import { inherits } from "node:util";
import { get_loaf } from "./utils.js";


export class Bread {
    constructor() { // get number of types of bread and pick from the selection
        let loaf = get_loaf();
        this.intro_description = loaf.description;
        this.loaf_name = loaf.name;
        this.img_files = loaf.images;
        this.state_descriptions = loaf.state_description;
        this.value = loaf.value;
    }

}

