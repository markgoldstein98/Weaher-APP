const API_KEY = "8be1860db359470181e104408231505";
const root = document.querySelector("#root");
let API_CITY = "Budapest";
const PEXEL_API_KEY =
  "O9fOrILgaprmSC5L9R0sPBDbDbM8ag4kO7Er0SBCaXiUpZ8hV5AdSFIa";
let PEXEL_QUERY = "Budapest";

async function getFetch(url, header) {
  const response = await fetch(url, header);
  const data = await response.json();

  return data;
}
console.log(
  getFetch(
    `http://api.weatherapi.com/v1/current.json?key=8be1860db359470181e104408231505&q=${API_CITY}`
  )
);

function getElements() {
  let a = async function () {
    const response = await getFetch(
      `http://api.weatherapi.com/v1/current.json?key=8be1860db359470181e104408231505&q=${API_CITY}`
    );

    const main = document.createElement("main");
    main.classList.add("main");

    const section = document.createElement("section");
    section.classList.add("section");

    const h1 = document.createElement("h1");
    h1.innerText = response.location.name;

    const h2 = document.createElement("h2");
    h2.innerText = response.location.country;
    h2.classList.add("country");

    const condition = document.createElement("img");
    condition.classList.add("condition");
    condition.src = response.current.condition.icon;

    const condition1 = document.createElement("p");
    condition1.classList.add("condition-text");
    condition1.innerText = response.current.condition.text;

    const temp = document.createElement("section");
    temp.classList.add("temperature");
    temp.innerText = "";

    const temperature = document.createElement("div");
    temperature.innerText = response.current.temp_c + "℃";

    temp.append(temperature);

    const hum = document.createElement("section");
    hum.classList.add("humidity");
    hum.innerText = "Humidity";

    const humidity = document.createElement("div");
    humidity.innerText = response.current.humidity + "% 💧";

    hum.append(humidity);

    const windSpeed = document.createElement("section");
    windSpeed.classList.add("wind-speed");
    windSpeed.innerText = "Wind Speed";

    const wind = document.createElement("div");
    wind.innerText = response.current.wind_kph + "km/h 💨";

    windSpeed.append(wind);

    section.append(condition, condition1, temp, h1, h2, hum, windSpeed);

    main.append(section);

    root.append(main);
  };

  const label = document.createElement("label");
  label.setAttribute("for", "input");
  label.innerText = "Weather App:";

  const input = document.createElement("input");
  input.id = "input";
  input.name = "input";
  input.setAttribute("list", "search");
  input.autocomplete = "off"; //kell ez?
  input.placeholder = "Please add a city";

  const dataList = document.createElement("datalist");
  dataList.id = "search";

  const favorites = document.createElement("button");
  favorites.innerText = "⭐";
  favorites.classList.add("button");

  root.append(label, input, favorites, dataList);
  a();
}
getElements();
// ez a function ha beütöd a város nevét, változik és kívánt értékkel tér vissza
function eventListener() {
  const input = document.querySelector("#input");

  input.addEventListener("change", function (event) {
    API_CITY = input.value;

    let a = async function () {
      let data = await getFetch(
        `http://api.weatherapi.com/v1/current.json?key=8be1860db359470181e104408231505&q=${API_CITY}`
      );

      const main = document.querySelector("main");
      main.innerHTML = "";

      const section = document.createElement("section");
      section.classList.add("section");

      const h1 = document.createElement("h1");
      h1.innerText = data.location.name;

      const h2 = document.createElement("h2");
      h2.innerText = data.location.country;
      h2.classList.add("country");

      const condition = document.createElement("img");
      condition.classList.add("condition");
      condition.src = data.current.condition.icon;

      const condition1 = document.createElement("p");
      condition1.classList.add("condition-text");
      condition1.innerText = data.current.condition.text;

      const temp = document.createElement("section");
      temp.classList.add("temperature");
      temp.innerText = "Temperature";

      const temperature = document.createElement("div");
      temperature.innerText = data.current.temp_c + "°C";

      temp.append(temperature);

      const hum = document.createElement("section");
      hum.classList.add("humidity");
      hum.innerText = "Humidity";

      const windSpeed = document.createElement("section");
      windSpeed.classList.add("wind-speed");
      windSpeed.innerText = "Wind Speed";

      const wind = document.createElement("div");
      wind.innerText = data.current.wind_kph + "km/h 💨";
      windSpeed.append(wind);

      windSpeed.append(wind);

      const humidity = document.createElement("div");
      humidity.innerText = data.current.humidity + "💧";
      hum.append(humidity);

      section.append(condition, condition1, temp, h1, h2, hum, windSpeed);
      main.append(section);

      root.append(main);
    };

    a();
  });
}
eventListener();
// ez a rész hívja meg az inputnál hogy 3 karakter után, adjon vissza lehetőségeket.
function inputCitySearch() {
  const input = document.querySelector("#input");

  input.addEventListener("input", function (event) {
    if (input.value.length >= 3) {
      API_CITY = event.target.value;

      let a = async function () {
        let data = await getFetch(
          ` http://api.weatherapi.com/v1/search.json?key=8be1860db359470181e104408231505&q=${API_CITY} `
        );
        console.log(data);

        const dataList = document.querySelector("#search");
        dataList.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          const option = document.createElement("option");
          option.value = data[i].name;

          dataList.append(option);
        }
      };
      a();
    }
  });
}
inputCitySearch();

function getPexelsPictures() {
  const input = document.querySelector("input");
  const root = document.querySelector("#root");
  window.addEventListener("load", async function (event) {
    // a load az a window eventje, ezért itt a windowra tesszük az event listenert.
    let data = await getFetch(
      `https://api.pexels.com/v1/search?query=${PEXEL_QUERY}`,
      {
        headers: { Authorization: PEXEL_API_KEY }, // a general functionnel ket parametert adtam meg ezért tudom itt a headers második paraméternek beadni
      }
    );
    console.log(data.photos[8]);

    let backgroundImage = data.photos[3].src.large2x;
    root.style.backgroundImage = `url(${backgroundImage})`;
  });

  input.addEventListener("change", async function (event) {
    PEXEL_QUERY = event.target.value;

    let data = await getFetch(
      `https://api.pexels.com/v1/search?query=${PEXEL_QUERY}`,
      {
        headers: { Authorization: PEXEL_API_KEY }, // a general functionnel ket parametert adtam meg ezért tudom itt a headers második paraméternek beadni
      }
    );
    console.log(data.photos[3]);

    const section = document.querySelector("section");

    let backgroundImage = data.photos[5].src.large2x;
    root.style.backgroundImage = `url(${backgroundImage})`;
  });
}
getPexelsPictures();
// add to favorit button

function addToFavorites() {
  const but = document.querySelector(".button");
  const input = document.querySelector("input");
  input.value = API_CITY;
  but.addEventListener("click", async function (event) {
    const response = await getFetch(
      `http://api.weatherapi.com/v1/search.json?key=8be1860db359470181e104408231505&q=${API_CITY}`
    );
    console.log(response);
    const favoriteSection = document.createElement("favoriteSection");
    favoriteSection.innerText = "My favorite cities:";
    favoriteSection.classList.add("favorite-section");

    const div = document.createElement("div");
    div.innerText = response[0].name;

    const div1 = document.createElement("div");
    div1.innerText = response[0].country;

    favoriteSection.append(div, div1);
    root.append(favoriteSection);
  });
}

addToFavorites();

const container = document.createElement("div");
container.classList.add("container");
root.append(container);

function getForecast() {
  const input = document.querySelector("input");

  input.addEventListener("change", function (event) {
    API_CITY = event.target.value;
    let a = async function () {
      let data = await getFetch(
        `http://api.weatherapi.com/v1/forecast.json?key=8be1860db359470181e104408231505&days=5&q=${API_CITY}`
      );
      console.log(data);

      const div = document.querySelector(".container");
      div.innerHTML = "";

      // first day data
      const finalDay01 = document.createElement("section");
      finalDay01.classList.add("day1-full-section");

      const day1 = document.createElement("div");
      day1.classList.add("day");
      day1.innerText = data.forecast.forecastday[0].date;

      const day1Sunrise = document.createElement("div");
      day1Sunrise.classList.add("day1-sunrise");
      day1Sunrise.innerText =
        " Sunrise: " + data.forecast.forecastday[0].astro.sunrise;

      const day1Sunset = document.createElement("div");
      day1Sunset.classList.add("day1-sunset");
      day1Sunset.innerText =
        " Sunset: " + data.forecast.forecastday[0].astro.sunset;

      const day1MinTemp = document.createElement("div");
      day1MinTemp.classList.add("day1-mintemp");
      day1MinTemp.innerHTML =
        " Min. Temp:" + data.forecast.forecastday[0].day.mintemp_c;

      const day1MaxTemp = document.createElement("div");
      day1MaxTemp.classList.add("day1-maxtemp");
      day1MaxTemp.innerText =
        " Max.Temp: " + data.forecast.forecastday[0].day.maxtemp_c;

      const day1CondText = document.createElement("div");
      day1CondText.classList.add("day1-condtext");
      day1CondText.innerText =
        " Condition: " + data.forecast.forecastday[0].day.condition.text;

      const day1Cond = document.createElement("img");
      day1Cond.classList.add("day1-condition");
      day1Cond.src = data.forecast.forecastday[0].day.condition.icon;

      // second day data
      const finalDay02 = document.createElement("section");
      finalDay02.classList.add("final-day2");

      const day2 = document.createElement("div");
      day2.classList.add("day2");
      day2.innerText = data.forecast.forecastday[1].date;

      const day2Sunrise = document.createElement("div");
      day2Sunrise.classList.add("day2-sunrise");
      day2Sunrise.innerText =
        " Sunrise: " + data.forecast.forecastday[1].astro.sunrise;

      const day2Sunset = document.createElement("div");
      day2Sunset.classList.add("day2-sunset");
      day2Sunset.innerText =
        " Sunset: " + data.forecast.forecastday[1].astro.sunset;

      const day2MinTemp = document.createElement("div");
      day2MinTemp.classList.add("day2-mintemp");
      day2MinTemp.innerText =
        " Min.Temp: " + data.forecast.forecastday[1].day.mintemp_c;

      const day2MaxTemp = document.createElement("div");
      day2MaxTemp.classList.add("day2-maxtemp");
      day2MaxTemp.innerText =
        " Max.Temp: " + data.forecast.forecastday[1].day.maxtemp_c;

      const day2CondText = document.createElement("div");
      day2CondText.classList.add("day2-condtext");
      day2CondText.innerText =
        " Condition: " + data.forecast.forecastday[1].day.condition.text;

      const day2Cond = document.createElement("img");
      day2Cond.classList.add("day2-cond");
      day2Cond.src = data.forecast.forecastday[1].day.condition.icon;

      // third day data
      const finalDay03 = document.createElement("section");
      finalDay03.classList.add("final-day3");

      const day3 = document.createElement("div");
      day3.classList.add("day3");
      day3.innerText = data.forecast.forecastday[2].date;

      const day3Sunrise = document.createElement("div");
      day3Sunrise.classList.add("day3-sunrise");
      day3Sunrise.innerText =
        " Sunrise: " + data.forecast.forecastday[2].astro.sunrise;

      const day3Sunset = document.createElement("div");
      day3Sunset.classList.add("day3-sunset");
      day3Sunset.innerText =
        " Sunset: " + data.forecast.forecastday[2].astro.sunset;

      const day3MinTemp = document.createElement("div");
      day3MinTemp.classList.add("day3-mintemp");
      day3MinTemp.innerText =
        " Min.Temp: " + data.forecast.forecastday[2].day.mintemp_c;

      const day3Maxtemp = document.createElement("div");
      day3Maxtemp.classList.add("day3-maxtemp");
      day3Maxtemp.innerText =
        " Max.Temp: " + data.forecast.forecastday[2].day.maxtemp_c;

      const day3Condtext = document.createElement("div");
      day3Condtext.classList.add("day3-condtext");
      day3Condtext.innerText =
        " Condition " + data.forecast.forecastday[2].day.condition.text;

      const day3Cond = document.createElement("img");
      day3Cond.classList.add("day3-cond");
      day3Cond.src = data.forecast.forecastday[2].day.condition.icon;

      // fourth day data

      /* const finalDay04 = document.createElement("section");
      finalDay04.classList.add("final-day4");

      const day4 = document.createElement("div");
      day4.classList.add("day4");
      day4.innerText = data.forecast.forecastday[3].date;

      const day4Sunrise = document.createElement("div");
      day4Sunrise.classList.add("day4-sunrise");
      day4Sunrise.innerText = data.forecast.forecastday[3].astro.sunrise;

      const day4Sunset = document.createElement("div");
      day4Sunset.classList.add("day4-sunset");
      day4Sunset.innerText = data.forecast.forecastday[3].astro.sunset;

      const day4MinTemp = document.createElement("div");
      day4MinTemp.classList.add("day4-mintemp");
      day4MinTemp.innerText = data.forecast.forecastday[3].day.mintemp_c;

      const day4MaxTemp = document.createElement("div");
      day4MaxTemp.classList.add("day4-maxtemp");
      day4MaxTemp.innerText = data.forecast.forecastday[3].day.maxtemp_c;

      const day4CondText = document.createElement("div");
      day4CondText.classList.add("day4-cond");
      day4CondText.innerText = data.forecast.forecastday[3].day.condition.text;

      const day4Cond = document.createElement("img");
      day4Cond.classList.add("day4-cond");
      day4Cond.src = data.forecast.forecastday[3].day.condition.icon;

      // fifth day data

      const finalDay05 = document.createElement("section");
      finalDay05.classList.add("final-day5");

      const day5 = document.createElement("div");
      day5.classList.add("day5");
      day5.innerText = data.forecast.forecastday[4].date;

      const day5Sunrise = document.createElement("div");
      day5Sunrise.classList.add("day5-sunrise");
      day5Sunrise.innerText = data.forecast.forecastday[4].astro.sunrise;

      const day5Sunset = document.createElement("div");
      day5Sunset.classList.add("day5-sunset");
      day5Sunset.innerText = data.forecast.forecastday[4].astro.sunset;

      const day5MinTemp = document.createElement("div");
      day5MinTemp.classList.add("day5-mintemp");
      day5MinTemp.innerText = data.forecast.forecastday[4].day.mintemp_c;

      const day5MaxTemp = document.createElement("div");
      day5MaxTemp.classList.add("day5-maxtemp");
      day5MaxTemp.innerText = data.forecast.forecastday[4].day.maxtemp_c;

      const day5CondText = document.createElement("div");
      day5CondText.classList.add("day5-cond");
      day5CondText.innerText = data.forecast.forecastday[4].day.condition.text;

      const day5Cond = document.createElement("img");
      day5Cond.classList.add("day5-cond");
      day5Cond.src = data.forecast.forecastday[4].day.condition.icon; */
      finalDay01.append(
        day1,
        day1Sunrise,
        day1Sunset,
        day1MinTemp,
        day1MaxTemp,
        day1CondText,
        day1Cond
      );

      finalDay02.append(
        day2,
        day2Sunrise,
        day2Sunset,
        day2MinTemp,
        day2MaxTemp,
        day2CondText,
        day2Cond
      );

      finalDay03.append(
        day3,
        day3Sunrise,
        day3Sunset,
        day3MinTemp,
        day3Maxtemp,
        day3Condtext,
        day3Cond
      );

      /* finalDay04.append(
        day4,
        day4Sunrise,
        day4Sunset,
        day4MinTemp,
        day4MaxTemp,
        day4CondText,
        day4Cond
      );

      finalDay05.append(
        day5,
        day5Sunrise,
        day5Sunset,
        day5MinTemp,
        day5MaxTemp,
        day5CondText,
        day5Cond
      ); */

      container.append(
        finalDay01,
        finalDay02,
        finalDay03
        /*   finalDay04,
        finalDay05 */
      );
      root.append(container);
    };

    a();
  });
}
getForecast();
