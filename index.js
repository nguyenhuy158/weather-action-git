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
            "- 👋 Hi, I’m @hyquaq" +
            "- 👀 I’m love coding and studying" +
            "- 🌱 I’m currently learning at TDTU" +
            "- 💞️ I’m looking to collaborate on ..." +
            "- 📫 How to reach me software development" +
            "[🔥🔥🔥My Website🔥🔥🔥](https://hyquaq.github.io/hyquaq/index.html)" +
            "see yah 👋👋👋" +
            "# Weather current" +
            `## ${statusSky} - ${descriptionSky}` +
            `![](http://openweathermap.org/img/wn/${urlIcon}@2x.png)` +
            ` ${tempCurrent}°C�� - [${tempMin}°C- ${tempMax}°C]`;
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
