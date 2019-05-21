const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;


//Define paths for Express config
const publicPathDirectory = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//Setup handlebar engine and views location
app.set('view engine','hbs'); 
app.set('views',viewPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicPathDirectory));

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'Amy Pyae Phyo Naing'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Amy Pyae Phyo Naing'
    })
});

app.get('/help',(req, res) =>{
    res.render('help',{
        title:'Help',
        helpText:'How can i help you?',
        name:'Amy Pyae Phyo Naing'
    });
});

app.get('/weather',(req, res) =>{
    if(!req.query.address){
        return res.send({
           error:'You must provide an address' 
        });
    }

    var address =  req.query.address;

    geocode(address,(error,{latitude, longitude, location}={})=>{
        if(error){
           return res.send({ error });
        }
            
        forecast(latitude, longitude,(error,forecast)=>{
            if(error){
                return res.send({ error });
            } 

            res.send({
                forecast,location,address
            });
        });
        
    });
}); 

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })
});


app.get('/help/*',(req, res) =>{
    res.render('404',{
        title:404,
        name:'Amy Pyae Phyo Naing',
        errorMessage :'Help article not found'
    });
});

app.get('*',(req, res)=>{
    res.render('404',{
        title:404,
        name:'Amy Pyae Phyo Naing',
        errorMessage :'Page not found'
    });
});

app.listen(port,()=>console.log(`App is listening on port ${port}`)); 