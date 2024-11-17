const express = require("express");
const mysql = require("mysql");
require('dotenv').config();
const cors = require("cors");
const app = express();

// use cors to follow webbrower policy
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set port and connect database
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

// API
app.get("/", (re,res) => {
    return res.json("From Backend side");
})

// users API
app.get("/users", (req, res) => {
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
  
  db.query("insert into users (username, password, name,avatar,coverphoto,email,role) VALUES (?,?,?,?,?,?,?)",[username,password,name,avatar,coverphoto,email,role], (err,result)=>{
     if(err) {
         console.log(err)
     } 
     console.log(result)
  }
  ); 
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const avatar = req.body.avatar;
  const coverphoto = req.body.coverphoto;
  const email = req.body.email;
  const role = req.body.role;

  // check for case only upload avatar or coverphoto 
  if (username===undefined){
    if (avatar !== undefined && coverphoto===undefined){
      db.query("update users set avatar = ? where id = ?",[avatar,id], (err,result)=>{
        if(err) {
            console.log(err)
        } 
        console.log(result)
     }
     );  
    }
    else if (coverphoto !== undefined && avatar===undefined){
      db.query("update users set coverphoto = ? where id = ?",[coverphoto,id], (err,result)=>{
        if(err) {
            console.log(err)
        } 
        console.log(result)
     }
     );
    }
  }
  else{
    db.query("update users set username = ?, password = ? , name = ?, avatar = ?, coverphoto = ?, email = ?, role = ? where id = ?",[username,password,name,avatar,coverphoto,email,role, id], (err,result)=>{
      if(err) {
          console.log(err)
      } 
      console.log(result)
   }
   ); 
  }
 
});

app.delete('/users/:id',(req,res)=>{
  const id = req.params.id;
  
  db.query("delete from users where id= ?", id, (err,result)=>{
  if(err) {
  console.log(err)
  } }) })


// products API
app.get("/products", (req, res) => {
  const q = "select * from products";
  db.query(q, (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});

app.post("/products", (req, res) => {
  const createdAt = req.body.createdAt;
  const qrcode = req.body.qrcode;
  const scanner = req.body.scanner;
  const itemcode = req.body.itemcode;
  const status = req.body.status;
  const position = req.body.position;
  console.log(createdAt)
  db.query("insert into products (createdAt, qrcode, scanner,itemcode, status, position) VALUES (?,?,?,?,?,?)",[createdAt,qrcode,scanner,itemcode,status,JSON.stringify(position)], (err,result)=>{
     if(err) {
         console.log(err)
     } 
     console.log(result)
  }
  ); 
});

app.listen(port, ()=>{
    console.log("listening");
})
