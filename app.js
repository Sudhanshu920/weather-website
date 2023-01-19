require('dotenv').config();
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const url="https://api.openweathermap.org/data/2.5/weather?q="+req.body.city+"&appid="+process.env.APP_ID+"&units=metric";

    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            res.write("<p>the condition in "+req.body.city+" is "+weatherData.weather[0].description+"</p>")
            res.write("<h1>the temperature of "+req.body.city+" is "+weatherData.main.temp+" degree celcius</h1>")
            const icon="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
            res.write("<img src="+icon+">")
            res.send();
        })
    })
})


app.listen(3000,function(){
    console.log("server started running on port 3000");
})
