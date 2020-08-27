import path from "path";
import fs from "fs";
import matter from "gray-matter";

const getFile = (fileName) => {
    return fs.readFileSync(
      path.resolve("static/content/", fileName),
      "utf-8"
    );
  };
  

export function get(req, res, _) {
    const file = getFile('home_page.md')
    
    const { data, isEmpty } = matter(file)

    if(!isEmpty) {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(404, {
            "Content-Type": "application/json",
        });
      
        res.end(
            JSON.stringify({
                message: `Not found`,
            })
        );
    }
}