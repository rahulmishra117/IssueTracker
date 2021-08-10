const express=require('express');
const port=9000;
const app=express();
const bodyParser = require('body-parser');
const path = require('path');

const db=require('./config/mongoose');

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
})
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('assests'));




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`port is working at ${port}`);
})