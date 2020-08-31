
console.log("Client Side Javascript")


const button = document.querySelector('button')
const input = document.querySelector('input')
const forecast = document.getElementById('forecast')

button.onclick = (event)=> {

    event.preventDefault()
    const address = input.value;

    const url = 'http://localhost:3000/weather?address=' + address

    fetch(url).then((response) => {
    response.json().then((data) => {

        if(data.error){
            forecast.innerHTML = data.error
        }
        else
        forecast.innerHTML = data.forecast
    })
})
}

