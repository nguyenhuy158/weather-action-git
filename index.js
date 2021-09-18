//
const request = require("request");
const fs = require("fs");

const url = "https://api.openweathermap.org/data/2.5/weather?q=vietnam&appid=";
const api = process.argv[2];

// console.log(url + api);
request(url + api + "&units=Metric", { json: true }, (error, res, body) => {
    if (error) {
        return console.log(error);
    }

    if (!error && res.statusCode == 200) {
        // do something with JSON, using the 'body' variable

        // console.log(res.body)
        console.log(typeof body);
        const { weather, main: temperature, name: countryName, wind } = body;

        console.log( weather[0])

        const { main: statusSky, description: descriptionSky, icon: urlIcon} = weather[0];
        const {temp: tempCurrent, temp_min: tempMin, temp_max: tempMax} = temperature;
        // console.log(weather.main)
        const readme = `
        # Weather current
        ## ${statusSky} - ${descriptionSky}

        ![](http://openweathermap.org/img/wn/${urlIcon}@2x.png)
        current: ${tempCurrent} - [min: ${tempMin}/ max: ${tempMax}]
        `;
        console.log(readme);

        fs.writeFileSync("./README.md", readme);

        // or
        // fs.writeFile("./data.json", time, function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // });
    }
});
