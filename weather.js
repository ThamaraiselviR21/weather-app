let search = document.getElementById("getWeather");
let input = document.getElementById("input");
let cityElement = document.getElementById("city");
let pressure = document.getElementById("pres");
let temperature = document.getElementById("temp");
let wind = document.getElementById("wind");
let humidity = document.getElementById("hum");
let icon = document.getElementById("icon");
let details = document.getElementById("detail");
const key = '181cc6cbf6617fb2be72c79d94a55ab3';

search.addEventListener('click', () => {
    const city = input.value; // Get the value of the input field
    if (city=="") {
        alert("Please enter a city name.");
        // Clear the input field
    } else {
        weather(city);
        console.log(city);
        input.value = "";
    }
});

async function weather(city) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);

        console.log("response",response);
        
        if (response.status==404) {
            throw ("City not found");
        }
        let data = await response.json();
        console.log("data",data);
        
        cityElement.innerHTML = data.name;
        temperature.innerHTML = `temperature:${data.main.temp}°C`;
        humidity.innerHTML = `humidity:${data.main.humidity}%`;
        wind.innerHTML = ` wind:${data.wind.speed} km/h`;
        pressure.innerHTML = `pressure:${data.main.pressure} %`;
        details.innerHTML = data.weather[0].main; 
         updateWeatherIcon(data.weather[0].main)

    } catch (err) {
        // alert("Enter a valid city name.");
        console.log(err);
        icon.style.display='none';
        temperature.innerHTML = "0°C";
        cityElement.innerHTML = "City not found";
        humidity.innerHTML = "0%";
        wind.innerHTML = "0 km/h";
        pressure.innerHTML = "N/A"; // 
        details.innerHTML = "0";

    }
    function updateWeatherIcon(condition) {
        // console.log(condition);
        switch (condition.toLowerCase()) {    
            case 'clear':
                icon.src = './clear.png';
                break;
            case 'clouds':
                icon.src = './cloud.png';                
                break;
            case 'rain':
                icon.src = './rain.png';
                break;
            case 'snow':
                icon.src = './snow.jpg';                
                break;
            default:
                icon.src ="./de.jpg"; // A default image
        }
        icon.style.display = 'inline-block';
    }
}
