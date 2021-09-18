import fetch from "node-fetch";

const url = "https://worldtimeapi.org/api/timezone/Asia/Bangkok";
const date = await fetch(url)
    .then((response) => response.json())
    .then((json) => json.datetime)
    .catch((error) => console.log(error));

const currentDate = new Date(date.slice(0, date.indexOf(".")));
console.log(typeof date.slice(0, date.indexOf(".")))
console.log(currentDate);

// console.log(new Date())
// console.log((new Date()).getHours() + ":" + (new Date()).getMinutes())
