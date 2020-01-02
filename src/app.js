const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forcast')
const http = require('http')

const app = express()
const port = process.env.PORT || 4000
// directory path for config render
const directoryPublic = path.join(__dirname,'../public')
const viewPath  = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.use(express.static(directoryPublic))
//setup handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)



app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Asaf Eliasim'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Asaf Eliasim'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Asaf Eliasim'
    });
})
app.get('/help',(req,res)=>{
    res.send("Hello Help")
})

app.get('/about',(req,res)=>{
    res.send("Hello about")
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "You must provide address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        debugger
        forecast(latitude,longitude,(error, data)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                Address: req.query.address,
                location,
                forecast: data
            })
        })

    })

})


app.get('/json',(req,res)=>{
    res.send({
        name: 'Asaf',
        age: 28
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404 page",
        name: "Asaf Eliasim",
        errorMessage: "Help article not exists"
    })
})
app.get('*',(req,res)=>{
   res.render('404',{
       title: "404",
       name: "Asaf Eliasim",
       errorMessage: "Page not found"
   })
})
app.listen(port, ()=>{
    console.log("Server is up")
})

