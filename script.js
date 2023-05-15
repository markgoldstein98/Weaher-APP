const API_KEY = "8be1860db359470181e104408231505";
const root = document.querySelector("#root");
const API_CITY = "Budapest";

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

    const section = document.createElement("section");
    section.classList.add("section");

    const h1 = document.createElement("h1");
    h1.innerText = response.location.name;

    const temp = document.createElement("div");
    temp.classList.add("temp");

    const temperature = document.createElement("div");
    temperature.innerText = response.current.temp_c;
    temp.append(temperature);

    const humidity = document.createElement("div");
    humidity.classList.add("humidity");

    const hum = document.createElement("div");
    hum.innerText = response.current.humidity;

    humidity.append(hum);

    section.append(h1, temperature, humidity);
    root.append(section);
  };
  a();
}
getElements();
