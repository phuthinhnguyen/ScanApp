const express = require("express");
const mysql = require("mysql");
require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())
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

// users api
app.get("/users", (req, res) => {
  console.log(req.body)
    const q = "select * from users";
    db.query(q, (err, data) => {
      console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
    });
  });
app.post("/users", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const avatar = req.body.avatar;
  const coverphoto = req.body.coverphoto;
  const email = req.body.email;
  const role = req.body.role;
  console.log(username,password,name,avatar,coverphoto,email,role)
  
  db.query("INSERT INTO users (username, password, name,avatar,coverphoto,email,role) VALUES (?,?,?,?,?,?,?)",[username,password,name,avatar,coverphoto,email,role], (err,result)=>{
     if(err) {
         console.log(err)
     } 
     console.log(result)
  }
  ); 
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
