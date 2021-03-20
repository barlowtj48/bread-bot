import glob from "glob";
import path from "path";

export function get_loaf() {
    let dir = process.cwd();
    glob.sync(process.cwd() + "/bread_pics/*/*.json").forEach(async dir_file => {
        dirs = JSON.parse(dir_file);
    });
}