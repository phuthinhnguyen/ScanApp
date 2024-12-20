const express = require("express");
const mysql = require("mysql");
require('dotenv').config();
const cors = require("cors");
const app = express();
const multer = require('multer')

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

// Upload photos to host by multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage 
  // limits: { fileSize: 1 * 1024 * 1024 } // limit image size <= 1MB
}).any()

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    }
    res.send(req.files);
  });

});
// app.use(express.static('public'));


// API
app.get("/", (re,res) => {
    return res.json("From Backend side");
})

// users API
app.get("/users", (req, res) => {
    const q = "select * from users";
    db.query(q, (err, data) => {
      // console.log(err, data);
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
  
  db.query("insert into users (username, password, name,avatar,coverphoto,email,role) VALUES (?,?,?,?,?,?,?)",[username,password,name,avatar,coverphoto,email,role], (err,data)=>{
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
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
    if (avatar !== undefined && coverphoto===undefined && role===undefined){
      db.query("update users set avatar = ? where id = ?",[avatar,id], (err,result)=>{
        if(err) {
            console.log(err)
        } 
        console.log(result)
     }
     );  
    }
    else if (coverphoto !== undefined && avatar===undefined && role===undefined){
      db.query("update users set coverphoto = ? where id = ?",[coverphoto,id], (err,result)=>{
        if(err) {
            console.log(err)
        } 
        console.log(result)
     }
     );
    }
    else if (role !== undefined && avatar===undefined && coverphoto===undefined){
      db.query("update users set role = ? where id = ?",[role,id], (err,data)=>{
        console.log(err, data);
        if (err) return res.json({ error: err.sqlMessage });
        else return res.json({ role: role,id:id}); 
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
  
  db.query("delete from users where id= ?", id, (err,data)=>{
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });  
  }) })


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
  const lockitem = req.body.lockitem;
  const idcode = req.body.idcode;
  db.query("insert into products (idcode, createdAt, qrcode, scanner, itemcode, status, position, lockitem) VALUES (?,?,?,?,?,?,?,?)",[idcode,createdAt,qrcode,scanner,itemcode,status,JSON.stringify(position),JSON.stringify(lockitem)], (err,data)=>{
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({idcode:idcode, createdAt:createdAt, qrcode:qrcode, scanner:scanner,itemcode:itemcode,status:status,position:position, lockitem:lockitem});
  }
  ); 
});

app.put("/products/:idcode", (req, res) => {
  const idcode = req.params.idcode;
  const createdAt = req.body.createdAt;
  const qrcode = req.body.qrcode;
  const scanner = req.body.scanner;
  const itemcode = req.body.itemcode;
  const status = req.body.status;
  const position = req.body.position;
  const lockitem = req.body.lockitem;

  db.query("update products set createdAt = ?, qrcode = ? , scanner = ?, itemcode = ?, status = ?, position = ?, lockitem = ? where idcode = ?",[createdAt,qrcode,scanner,itemcode,status,JSON.stringify(position),JSON.stringify(lockitem),idcode], (err,data)=>{
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({idcode:idcode, createdAt:createdAt, qrcode:qrcode, scanner:scanner,itemcode:itemcode,status:status,position:JSON.stringify(position),lockitem:JSON.stringify(lockitem)});
 }
 ); 
 
});

app.delete('/products/:idcode',(req,res)=>{
  const idcode = req.params.idcode;
  
  db.query("delete from products where idcode= ?", idcode, (err,data)=>{
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ idcode });
  }) })


app.listen(port, ()=>{
    console.log("listening");
})
