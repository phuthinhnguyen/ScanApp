const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors);
const port = process.env.PORT || 8080;
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "scanapp"
})
app.get("/", (re,res) => {
    return res.json("From Backend side");
})
app.get("/users", (re,res) => {
    return res.json("From Backend side");
})

app.listen(port, ()=>{
    console.log("listening");
})