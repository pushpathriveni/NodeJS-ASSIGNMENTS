const express = require("express");
    var bodyParser = require('body-parser');
    const user = require("./model/user");
    const mongoose = require('mongoose');
    var methodOverride = require('method-override')
    mongoose.connect('mongodb://localhost:27017/assigment_4');
    
    const app = express();
    // override with POST having ?_method=DELETE
    app.use(methodOverride('_method'))
    
    app.use(bodyParser());
    app.use(express.static("public"));
    
    app.set('views', './views');
    app.set('view engine', 'ejs');
       
    app.get("/", async (req, res) =>{
        // write the code to fetch the data
        const users = await user.find();
        res.render("index.ejs", {users});
    })
    
    app.get("/form", (req, res) =>{
        res.render("form.ejs");
    })
    
    app.post("/user/add", async (req, res) =>{
        // Add cvode tp write the data in database
        console.log(req.body);
        const {name, email, age, city, profession} = req.body;
        await user.create({
            name,
            email,
            age,
            city, 
            profession
        })
        res.redirect("/");
    })

    app.put("/user/:city", async (req, res) =>{
        // Add cvode tp write the data in database
        console.log(req.params.city);
        await user.updateOne({city: req.params.city}, {selected: true});
        res.redirect("/");
    })
    
    app.delete("/user/:city", async (req, res) =>{
        // Add cvode tp write the data in database
        await user.deleteOne({_id: req.params.id}, {selected: true});
        res.redirect("/");
    })
    
    app.listen(3000, ()=> console.log("Server is running"));