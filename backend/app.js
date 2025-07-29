const express = require("express");
const app = express();
const port = 3000;
const db = require("./controller/conn");
const cors = require("cors");
const response = require("./controller/response");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Ready!");
});

app.get("/daftar-produk", (req, res) => {
  const query = "SELECT * FROM product_table";
  db.query(query, (err, result) => {
    const msg = ["Succes get all data!", "Failed to get data! something wrong"];
    if (err) throw err;
    if (result.length > 0) {
      response(200, result, msg[0], res);
    } else {
      response(404, result, msg[1], res);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
