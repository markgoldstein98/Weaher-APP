const API_KEY = "8be1860db359470181e104408231505";
const root = document.querySelector("#root");
let API_CITY = "Budapest";
const PEXEL_API_KEY =
  "O9fOrILgaprmSC5L9R0sPBDbDbM8ag4kO7Er0SBCaXiUpZ8hV5AdSFIa";
let PEXEL_QUERY = "Budapest";

// general fetch történik
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

// létrehozzuk azt az elemet amit az oldal betöltésénél akarunk látni.
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

  root.append(label, input, dataList);
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

// Pexels által létrehozzunk képeket ha rányomunk az inputra és beütjük a várost.

function getPexelsPictures() {
  const input = document.querySelector("input");

  input.addEventListener("change", async function (event) {
    PEXEL_QUERY = event.target.value;

    let data = await getFetch(
      `https://api.pexels.com/v1/search?query=${PEXEL_QUERY}`,
      {
        headers: { Authorization: PEXEL_API_KEY }, // a general functionnel ket parametert adtam meg ezért tudom itt a headers második paraméternek beadni
      }
    );
    console.log(data.photos[8]);

    const section = document.querySelector("section");
    /*   main.innerHTML = ""; */
    const pexelImg = document.createElement("img");

    pexelImg.src = data.photos[8].src.landscape;

    section.append(pexelImg);
  });
}
getPexelsPictures();
