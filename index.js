const http = require("http");
const fs = require("fs");
var requests = require("request");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal)=>{
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    

    return temperature;
};

const server = http.createServer((req, res)=>{
    if(req.url == "/"){
        requests(
            "http://api.openweathermap.org/data/2.5/weather?q=gangtok,sikkim&APPID=58287142c82fcbc927d0e2763b7f5709"
        )
        .on("data", (chunk)=>{
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
          //  console.log(arrData[0].main.temp);
          const realTimeData = arrData.map((val)=> replaceVal(homeFile, val)).join("");
          res.write(realTimeData);
           // console.log(realTimeData);
        })
        .on("end",  (err)=>{
            if(err) return console.log("connection closed due to errors", err);
            res.end();
        });
    }
});

server.listen(8000, "127.0.0.1");
