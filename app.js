const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const items=[];
const works=[];

app.set('view engine','ejs'); //setting up ejs
app.set('views',path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    let day = today.toLocaleDateString("en-US",options);
    res.render('list', {listTitle: day, newListItems: items});
});

app.post('/',(req,res)=>{
    console.log(req.body);
    let item = req.body.newItem; //form input extracted
    if(req.body.list === "Work List "){
        works.push(item);
        res.redirect('/work')
    }else{
        items.push(item);
    res.redirect('/');
    }
    
});

app.get('/work',(req,res)=>{
    res.render('list',{listTitle: "Work List", newListItems: works});
});

app.post('/work',(req,res)=>{
    let item = req.body.newItem; //form input extracted
});

app.listen(3000,()=>{
    console.log("Server up and Running");
})