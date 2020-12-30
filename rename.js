const fs = require("fs");

fs.readdir(__dirname, { withFileTypes: true }, (err, filenames) => {
  filenames.forEach((f) => {
    if (f.name.endsWith(".json")) {
      fs.readFile(__dirname + "/" + f.name, "utf-8", (err, content) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return;
        }
        const jsonFile = JSON.parse(content);
        if (jsonFile.objects) {
          const code = f.name.slice(0, 3);
          if (jsonFile.objects[code]) {
            jsonFile.objects[code].geometries.forEach((g) => {
              if (g.properties.id) {
                const id = g.properties.id;
                g["id"] = id;

                fs.writeFile(
                  __dirname + "/" + f.name,
                  JSON.stringify(jsonFile),
                  (e) => {}
                );
              }
            });
          }
        }
      });
    }
  });
});
