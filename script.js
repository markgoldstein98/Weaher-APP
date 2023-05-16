const API_KEY = "8be1860db359470181e104408231505";
const root = document.querySelector("#root");
let API_CITY = "Budapest";

async function getFetch(url) {
  const response = await fetch(url);
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

    const condition = document.createElement("img");
    condition.classList.add("condition");
    condition.src = response.current.condition.icon;

    const condition1 = document.createElement("p");
    condition1.classList.add("condition-text");
    condition1.innerText = response.current.condition.text;

    const temp = document.createElement("section");
    temp.classList.add("temperature");
    temp.innerText = "Temperature";

    const temperature = document.createElement("div");
    temperature.innerText = response.current.temp_c + "℃";

    temp.append(temperature);

    const hum = document.createElement("section");
    hum.classList.add("humidity");
    hum.innerText = "Humidity";

    const humidity = document.createElement("div");
    humidity.innerText = response.current.humidity + "%";
    hum.append(humidity);

    const timezone = document.createElement("section");
    timezone.classList.add("timezone");
    timezone.innerText = "Timezone";

    const time = document.createElement("div");
    time.innerHTML = response.location.tz_id;

    timezone.append(time);

    section.append(h1, condition, condition1, temp, hum, timezone);

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

      const humidity = document.createElement("div");
      humidity.innerText = data.current.humidity + "%";
      hum.append(humidity);

      const timezone = document.createElement("section");
      timezone.classList.add("timezone");
      timezone.innerText = "Timezone";

      const time = document.createElement("div");
      time.innerHTML = data.location.tz_id;

      timezone.append(time);

      section.append(h1, condition, condition1, temp, hum, timezone);
      main.append(section);

      root.append(main);
    };

    a();
  });
}
eventListener();

// API ami meghívja az autocomplete functiont,
// kell még egy function amibe az eventlister azt vizsgálja ha input keröl bele akkor mi lesz
// auto complete html form megnézése
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
