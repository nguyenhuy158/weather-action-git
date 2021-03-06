//
const request = require("request");
const fs = require("fs");

const url = "https://api.openweathermap.org/data/2.5/weather?q=vietnam&appid=";

const api = process.argv[2];

request(url + api + "&units=Metric", { json: true }, (error, res, body) => {
    if (error) {
        return console.log(error);
    }

    if (!error && res.statusCode == 200) {
        const { weather, main: temperature, name: countryName, wind } = body;
        const {
            main: statusSky,
            description: descriptionSky,
            icon: urlIcon,
        } = weather[0];
        const {
            temp: tempCurrent,
            temp_min: tempMin,
            temp_max: tempMax,
        } = temperature;
        const readme =
            "- š Hi, Iām @hyquaq[āā[š„š±ļøš„](https://hyquaq.github.io/hyquaq/index.html)]\n" +
            "- š Iām love coding and studying\n" +
            "- š± Iām currently learning at TDTU\n" +
            "- šļø Iām looking to collaborate on ...\n" +
            "- š« How to reach me software development\n" +
            "- ---\n" +
            `${statusSky} ā ${descriptionSky}\n` +
            `![](http://openweathermap.org/img/wn/${urlIcon}.png)\n` +
            ` ${tempCurrent}Ā°Cš„° ā ${tempMin}Ā°Cš§  ${tempMax}Ā°Cš”ļø\n` +
            "- ---\n" +
            "see yah ššš\n";
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
