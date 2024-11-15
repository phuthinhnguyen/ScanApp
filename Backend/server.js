const express = require("express");
const mysql = require("mysql");
require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 4200;
const db = mysql.createConnection({
    host: "123.30.136.248",
    user: "xjhvevsw_phuthinhnguyen1101",
    password: "thinhthinh123",
    database: "xjhvevsw_scanapp"
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "scanapp"
})
app.get("/", (re,res) => {
    return res.json("From Backend side");
})
app.get("/users", (req, res) => {
    const q = "select * from users";
    db.query(q, (err, data) => {
      console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
    });
  });
app.get("/products", (req, res) => {
  const q = "select * from products";
  db.query(q, (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});
app.listen(port, ()=>{
    console.log("listening");
})
