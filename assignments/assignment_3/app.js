const express = require("express")
const faker = require("faker")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.set('views','./views');
app.set('view engine', 'ejs');
var users = [];
for (let i=0;i<5;i++){
    users.push({
        name:faker.name.findName(),
        email:faker.internet.email(),
        age: i+21,
        city:faker.address.city()
    })
}
// console.log(users)
app.get("/",(req,res)=>res.render("index.ejs",{users}))
app.get("/form",(req,res)=>res.render("form.ejs"))
app.post('/user/add', (req, res) =>{
    users.push({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        city: req.body.city
    })
    res.redirect('/')
})
app.listen(3000,()=>{console.log("server is runing")})




