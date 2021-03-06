const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port=process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;

    console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log(err);
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
})

 app.get('/',(req,res)=>{
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs',{
        pageTittle:'Home page',
        welcomeMsg:'Welcome to my webpage',
    });
 });

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTittle:'About page',
    });
});

app.get('/project',(req,res)=>{
    res.render('project.hbs',{
        pageTittle:'About Project',
    });
});


app.get('/bad',(req,res)=>{
    res.send({
        error:'bad request'
    });
})

 app.listen(port,()=>{
     console.log(`Server is up on port ${port}`)
 });