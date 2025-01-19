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
})

app.get("/upload", (req, res) => {
  const q = "select * from photos";
  db.query(q, (err, data) => {
    // console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});


app.post('/upload',upload.any(), (req, res) => {
  const allphotos = req.files;
  var allphotosname = []
  // upload(req, res, (err) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.send(req.files);
  // });
  for (let i=0;i<allphotos.length;i++){
    db.query("insert into photos (name) VALUES (?)",[allphotos[i].filename], (err,data)=>{
      if (err) return res.json({ error: err.sqlMessage });
    }
    );
    allphotosname.push(allphotos[i].filename)
  }
  return res.json({ allphotosname });
});
// app.use(express.static('public'));


// Upload excel sample tracking file to host by multer
app.get("/uploadexcelfilesampletracking", (req, res) => {
  const q = "select * from sampletracking";
  db.query(q, (err, data) => {
    // console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});


const xlsx = require('xlsx');

app.post('/uploadexcelfilesampletracking',upload.single('file'), (req, res) => {

const workbook = xlsx.readFile(req.file.path);

const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
const collectdata = []
// Data handling logic will be implemented here
const insertData = async () => {

  for (let row of data) {
  
    const [column1, column2, column3, column4] = row;
    db.query("insert into sampletracking (partcode,recieveday,status,fileready) VALUES (?,?,?,?)",[column1,column2,column3,column4], (err,data)=>{
      if (err) return res.json({ error: err.sqlMessage });
    }
    );
    collectdata.push({partcode:column1,recieveday:column2,status:column3,fileready:column4})

  };
  return res.json({ data:collectdata })
  }
  db.query("TRUNCATE TABLE sampletracking;");
  insertData();
  
  });


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
        // console.log(result)
     }
     );  
    }
    else if (coverphoto !== undefined && avatar===undefined && role===undefined){
      db.query("update users set coverphoto = ? where id = ?",[coverphoto,id], (err,result)=>{
        if(err) {
            console.log(err)
        } 
        // console.log(result)
     }
     );
    }
    else if (role !== undefined && avatar===undefined && coverphoto===undefined){
      db.query("update users set role = ? where id = ?",[role,id], (err,data)=>{
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
      else return res.json({ name: name,password:password}); 
   }
   ); 
  }
 
});

app.delete('/users/:id',(req,res)=>{
  const id = req.params.id;
  
  db.query("delete from users where id= ?", id, (err,data)=>{
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });  
  }) })


// products API
app.get("/products", (req, res) => {
  const q = "select * from products";
  db.query(q, (err, data) => {
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
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({idcode:idcode, createdAt:createdAt, qrcode:qrcode, scanner:scanner,itemcode:itemcode,status:status,position:JSON.stringify(position),lockitem:JSON.stringify(lockitem)});
 }
 ); 
 
});

app.delete('/products/:idcode',(req,res)=>{
  const idcode = req.params.idcode;
  
  db.query("delete from products where idcode= ?", idcode, (err,data)=>{
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ idcode });
  }) })


// leaverequest API
app.get("/leaverequest", (req, res) => {
  const q = "select * from leaveapplication";
  db.query(q, (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
});

app.post("/leaverequest", (req, res) => {
  const requestid = req.body.requestid;
  const createdAt = req.body.createdAt;
  const empcode = req.body.empcode;
  const fullname = req.body.fullname;
  const dept = req.body.dept;
  const type = req.body.type;
  const reason = req.body.reason;
  const totaldaysleave = req.body.totaldaysleave;
  const fromdate = req.body.fromdate;
  const leaderapproval = req.body.leaderapproval;
  const supervisorapproval = req.body.supervisorapproval;

  db.query("insert into leaveapplication (requestid, createdat, empcode,fullname,dept,type,reason,totaldaysleave,fromdate,leaderapproval,supervisorapproval) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[requestid, createdAt, empcode,fullname,dept,type,reason,totaldaysleave,fromdate,leaderapproval,supervisorapproval], (err,data)=>{
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ requestid:requestid,createdat:createdAt,empcode:empcode,fullname:fullname,dept:dept,type:type,reason:reason,totaldaysleave:totaldaysleave,fromdate:fromdate,leaderapproval:leaderapproval,supervisorapproval:supervisorapproval });
  }
  ); 
});

app.put("/leaverequest/:requestid", (req, res) => {
  const requestid = req.params.requestid;
  const createdAt = req.body.createdAt;
  const empcode = req.body.empcode;
  const fullname = req.body.fullname;
  const dept = req.body.dept;
  const type = req.body.type;
  const reason = req.body.reason;
  const totaldaysleave = req.body.totaldaysleave;
  const fromdate = req.body.fromdate;
  const leaderapproval = req.body.leaderapproval;
  const supervisorapproval = req.body.supervisorapproval;

  db.query("update leaveapplication set createdat = ?, empcode = ? , fullname = ?, dept = ?, type = ?, reason = ?, totaldaysleave = ?, fromdate = ?, leaderapproval = ?, supervisorapproval = ? where requestid = ?",[createdAt,empcode,fullname,dept,type,reason,totaldaysleave,fromdate,leaderapproval,supervisorapproval,requestid], (err,data)=>{
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({requestid:requestid, createdat:createdAt, empcode:empcode, fullname:fullname,dept:dept,type:type,reason:reason,totaldaysleave:totaldaysleave,fromdate:fromdate,leaderapproval:leaderapproval,supervisorapproval:supervisorapproval});
 }
 ); 
 
});

app.listen(port, ()=>{
    console.log("listening");
})
