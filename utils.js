import glob from "glob";
import path from "path";

export function get_loaf() {
    let dir = process.cwd();
    glob.sync(process.cwd() + "/bread_pics/*/*.json").forEach(async dir_file => {
        console.log(dir_file);
        let possible_entries = {}
        data = JSON.parse(dir_file);
        possible_entries.push(data);
        console.log(possible_entries);
    });
}