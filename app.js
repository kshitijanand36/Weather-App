const express = require("express");

const body_parser = require("body-parser");
const app = express();


app.use(body_parser.urlencoded({extended : true}));

const https = require("https");


app.get("/" , function(req , res){

  res.sendFile(__dirname + "/index.html")

  });

  app.post("/" , function(req , res){

    var city = req.body.city_name;

    const api_key = "hidden";
    const unit = "metric";
    // const city = "delhi";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + api_key + "&q=" + city + " &units="+ unit;
    https.get(url , function(response){

      console.log(response.statusCode);

      if(response.statusCode == "404"){

        res.send("<h1>Invalid Input!!</h1>");
      }

      else{

      response.on("data" , function(data){

        const weather_data = JSON.parse(data);
        const temp = weather_data.main.temp;
        const description = weather_data.weather[0].description;
        console.log(temp);

        res.write("<h1>The temperature of " +  city +  " is  " + temp + " Degree Celcius.</h1>");
        res.write("<p> The description is " + description  );


        const icon = weather_data.weather[0].icon;

        const image_url =  "http://openweathermap.org/img/wn/" + icon+"@2x.png";

        res.write("<br>")

        res.write("<img src = " + image_url + ">");

        res.send();
      });
    }
    });
    });

app.listen(3000 , function(){

  console.log("Server started at port 3000");
});
