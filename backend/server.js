const{ create, router, defaults, bodyParser } =  require("json-server");
const cors = require ("cors");
const { join } = require("path");
const request = require("request");
require("dotenv").config();

const server = create();
const _router = router("db.json");
const middlewares = defaults({ noCors: false });
const db = _router.db.__wrapped__;

server.use(cors());
server.use(middlewares);
server.use(bodyParser);

const FinancialController = require('./modules/financial');

FinancialController(server, db);

server.use(_router);


server.post("/api/getAccessToken", (req, res) => {
  console.log(req.body);
  const options = {
    method: "POST",
    url: "https://identity.primaverabss.com/connect/token",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    formData: req.body,
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    const jsonF = JSON.parse(response.body);
    console.log(jsonF);
    res.json(jsonF);
  });
});

server.get("*", (req, res) => {
  res.sendFile(join(__dirname, "frontend", "build", "index.html"));
});


server.listen(8080, () => console.log("Server listening on port 8080!"));
