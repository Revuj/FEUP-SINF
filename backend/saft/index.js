const commandLineArgs = require("command-line-args");

const optionDefinitions = [
  { name: "file", alias: "f", type: String, defaultValue: "db.xml" },
  {
    name: "schema",
    alias: "s",
    type: String,
    defaultValue: "SAFTPT1.04_011.xsd",
  },
];

const options = commandLineArgs(optionDefinitions);

//console.log(options);

module.exports = options;
