const parser = require("xml2json");
const options = require("./index.js");
const fs = require("fs");
const xmllint = require("xmllint");

fs.readFile(options.file.toString(), (err, data) => {
  //console.log(options.file);
  //console.log(data);
  const string = parser.toJson(data);
  //console.log(string);

  const jsonFile = JSON.parse(string);
  parsedContent = jsonFile.AuditFile;
  delete parsedContent["xmlns:xsi"];
  delete parsedContent["xmlns:xsd"];
  delete parsedContent["xsi:schemaLocation"];
  delete parsedContent.xmlns;

  fs.writeFileSync("db.json", JSON.stringify(parsedContent), (err2) => {
    if (err2) {
      console.log("error");
    }
  });
});
