// // import fetch from "node-fetch";

// const fetch = require("node-fetch");

// const date = fetch(url, {method: "Get"})
//     .then((response) => response.json())
//     .then((json) => json.datetime)
//     .catch((error) => console.log(error));

// console.log(new Date())
// console.log((new Date()).getHours() + ":" + (new Date()).getMinutes())

const request = require("request");
const fs = require("fs");

const url = "https://worldtimeapi.org/api/timezone/Asia/Bangkok";

let options = { json: true };

request(url, options, (error, res, body) => {
    if (error) {
        return console.log(error);
    }

    if (!error && res.statusCode == 200) {
        // do something with JSON, using the 'body' variable

        // console.log(res.body)
        const date = res.body.datetime;
        const currentDate = new Date(date.slice(0, date.indexOf(".")));
        const time = currentDate.getHours() + ":" + currentDate.getMinutes();
        console.log(time);

        fs.writeFileSync("./README.md", time);

        // or
        // fs.writeFile("./data.json", time, function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // });
    }
});
