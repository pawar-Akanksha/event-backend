const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const conn = require("./connection/conn");

conn();

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.post("/api/v1/events", async(req,res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            status : "Success",
            user
        })
    } catch(e) {
        res.status(500).json({
            status : "Failed",
            message : e.message
        })
        console.log(e.message);
    }
});

app.get("/api/v1/events", async(req,res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "Success",
            users
        })
    } catch (e) {
        res.status(500).json({
            status : "Failed",
            message : e.message
        })
        console.log(e.message);
    }
});

app.get("/api/v1/events/:id", async(req,res) => {
    try {
        const users = await User.find({_id:req.params});
        res.status(200).json({
            status: "Success",
            users
        })
    } catch (e) {
        res.status(404).json({
            status : "Failed",
            message : e.message
        })
        console.log(e.message);
    }
});

app.delete("/api/v1/events/:id", async(req,res) => {
    try {
        const user = await User.deleteOne({_id:req.params.id}, req.body);
        
        res.status(204).json({
            status: "Success",
            user
        })
    } catch (e) {
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
        console.log(e.message);
    }
});


app.put("/api/v1/events/:id", async(req,res) => {
    try {
        await User.updateOne({_id:req.params.id}, req.body);
        const user = await User.findOne({_id:req.params.id});
        res.status(200).json({
            status: "Success",
            user
        })
    } catch (e) {
        res.status(400).json({
            status : "Failed",
            message : e.message
        })
        console.log(e.message);
    }
});

app.post("/api/v1/events", (req,res) => {
    const {title, description, location, startTime, endTime} = req.body;
    if(!title) {
        return res.status(400).json({
            error: "Title is required"
        })
    }
});

app.put("/api/v1/events/:id", (req,res) => {
    const {id} = req.params;
    const {title, description, location, startTime, endTime} = req.body;
    if(!title) {
        return res.status(400).json({
            error: "Title is required"
        })
    }
});

app.get("/api/v1/events/:id", (req,res) => {
    const {id} = req.params;
    const event = User.find(e => e.id === Number(id));

    if(!event) {
        return res.status(400).json({
            error: "There is no event with that id"
        })
    }
});

app.delete("/api/v1/events/:id", (req,res) => {
    const {id} = req.params;
    const eventIndex = User.findIndex(e => e.id === Number(id));

    if(eventIndex === -1) {
        return res.status(400).json({
            error: "Event not found"
        });
    }
        events.splice(eventIndex,1);
        return res.json({
            message: "Event deleted succesfully"
        })
});



app.get("*", (req,res) => {
    res.status(404).send("Event not found!!");
})



app.listen(5000, ()=> console.log("your server is up and running at port 5000"));