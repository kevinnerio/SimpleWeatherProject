const express = require('express');
const app = express();
const https = require('https');

//Render the home page
app.get("/", function(req, res){

  //calling to the external API
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=34.39&lon=118.54&units=imperial&appid={{app-id}}";

  https.get(url, function(response){
    //let data = '';
    console.log(response.statusCode);

    //Inside the response.on ?
    response.on("data", function(data){

      weatherData = JSON.parse(data);
      const weatherObj = {
        condition: weatherData['weather'][0].main,
        temp: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        icon: weatherData.weather[0].icon,
      }

      const icon = "http://openweathermap.org/img/wn/" + weatherObj.icon + "@2x.png";

      //console.log(weatherObj);
      res.write("<h1>Simple Local Weather App</h1>");
      res.write("<p>The weather condition in Los Angeles County is: " + weatherObj.condition + "</p>");
      res.write("<p>The temperature in Los Angeles is: " + weatherObj.temp + "</p>");
      res.write("<img src ='"+icon+" '>");
      res.send();
    }

    );

  });
})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
