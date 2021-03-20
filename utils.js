import glob from "glob";
import path from "path";
import { readFileSync, writeFileSync } from "fs";


export function get_loaf() {
    let possible_entries = [];
    glob.sync(process.cwd() + "/bread_pics/*/*.json").forEach(async dir_file => {
        let data = JSON.parse(readFileSync(dir_file));
        possible_entries.push(data);
    });
    return possible_entries.random();
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }