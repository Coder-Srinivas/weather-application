// console.log("Client Side Javascript");

const button = document.querySelector("button");
const input = document.querySelector("input");
const forecast = document.getElementById("forecast");
const loc = document.getElementById("location");

button.onclick = (event) => {
  event.preventDefault();
  loc.textContent = "Loading...";
  forecast.textContent = "";
  const address = input.value;

  const url = "/weather?address=" + address;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        loc.textContent = data.error;
      } else {
          loc.textContent = data.location;
          forecast.textContent = data.forecast;}
    });
  });
};
