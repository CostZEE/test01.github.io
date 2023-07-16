// import express from "express";
// const app = express();
// import mysql from "mysql";
// import cors from "cors";
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "employeeSystem",
});

app.get('/employee', (req, res) => {
    db.query("SELECT * FROM employee", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const salary = req.body.salary;

    db.query("INSERT INTO employee (name, age, country, position, salary) VALUES (?,?,?,?,?)",
        [name, age, country, position, salary],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/update', (req, res) => {
    const id = req.body.id;
    const salary = req.body.salary;
    db.query("UPDATE employee SET salary = ? WHERE id = ?", [salary, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.post('/delete', (req, res) => {
    const id = req.body.id;
    db.query("DELETE FROM employee WHERE id = ?", [id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.listen('3001', () => {
    console.log('Server is running on port 3001');
});