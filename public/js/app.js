console.log("Client Side Javascript");

const button = document.querySelector("button");
const input = document.querySelector("input");
const forecast = document.getElementById("forecast");
const location = document.getElementById("location")

button.onclick = (event) => {
  event.preventDefault();
  location.innerHTML = "Loading...";
  const address = input.value;

  const url = "/weather?address=" + address;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        location.innerHTML = data.error;
      } else {
          location.innerHTML = data.location;
          forecast.innerHTML = data.forecast;}
    });
  });
};
