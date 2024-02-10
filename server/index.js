const express = require("express");
const app = express();
const mysql = require("mysql");
var cors = require("cors");

let corsOptions = {
  Origin: ["*", "http://localhost", "http://localhost:3001/"],
  Methods: ["OPTIONS", "GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  Headers: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.json);

const con = mysql.createConnection({
  host: "179.51.222.98",
  user: "root",
  password: "Uch@183109",
  database: "vitrinev_dados",
  port: "49415",
});

app.post("/register", function (req, res) {
  var name = req.body.name;
  var cost = req.body.cost;
  var category = req.body.category;
  var sql =
    "insert into teste(coluna_01, coluna_02, coluna_03) values (?, ?, ?);";

  con.query(sql, [name, cost, category], function (err, results) {
    if (err) throw err;
    else res.send(results);
  });
});

app.get("/getCards", (req, res) => {
  let sql = "select * from teste;";

  con.query(sql, function (err, results) {
    if (err) throw err;
    else res.send(JSON.stringify(results));
  });
});

app.post("/search", (req, res) => {
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;

  let mysql =
    "SELECT * from teste WHERE coluna01 = ? AND cost = ? AND coluna_03 = ?";
  db.query(mysql, [name, cost, category], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {
  let mysql = "SELECT * FROM teste";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let mysql =
    "UPDATE teste SET coluna_01 = ?, coluna_02 = ?, coluna_03 = ? WHERE id = ?";
  db.query(mysql, [name, cost, category, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM teste WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
