const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '9aad767d15b775af8dedfc7d12414d4f';


let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress',(event) =>{
    if(event.key == "Enter"){
        event.preventDefault(); //prevents instant refresh
        console.log(searchInputBox.value);
        getWeatherInfo(searchInputBox.value);
    }
});



//search by clicking 'search' button
submit.addEventListener("click",(e)=>{
    e.preventDefault();
    getWeatherInfo(searchInputBox.value);
});


function getWeatherInfo(city){
    fetch(`${url}?q=${city}&appid=${apiKey}&units=metric`) //metric == celcius
    //fetch data from url
        .then((weather) => {
            return weather.json();
        }).then(showWeatherInfo);
};

function showWeatherInfo(weather){
    let resCode = weather.cod;
    if(resCode ==='400'){
        //invalid req
        swal("Empty input","Please enter any city","error"); //sweet alert
        reset();
    }
    else if(resCode === '404'){
        //cant be found
        swal("Bad input","No match for this city found!","warning" );
        reset();
    }
    else{
        //ok
        // console.log(weather);
        let op = document.getElementById('weather-body');
        op.style.display = 'block';
        let todayDate = new Date();
        let parent = document.getElementById('parent');
        let weather_body = document.getElementById('weather-body');
        weather_body.innerHTML = `
            <div class = "location-details">
                <div class="city" id="city"> ${weather.name}, ${weather.sys.country}</div>
                <div class="date" id="date"> ${dateManage(todayDate)}</div>
            </div>
            <div class="weather-status">
                <div class="temp" id="temp">${Math.round(weather.main.temp)}&degC</div>
                <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i></div>
                <div class="min-max" id="min-max"> ${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
                <div id="updated_on">Updated at ${getTime(todayDate)} (local time)</div>
            </div>
            <hr>
            <div class="day-details">
                <div class="basic">Feels like ${Math.round(weather.main.feels_like)}&degC | Humidity ${weather.main.humidity}% <br>  Wind ${weather.wind.speed} KmPH</div>
            </div>
        `;
        parent.append(weather_body);
        reset();
    }
}


function getTime(todayDate){
    //last updated time
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

//return current date
function dateManage(dateArg){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year =dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date =dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`
}


//weather icon
function getIconClass(classArg){
    if(classArg === 'Rain'){
        return 'fas fa-cloud-showers-heavy';
    }
    else if (classArg === 'Clouds') {
        return 'fas fa-cloud';
    } else if (classArg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classArg === 'Snow') {
        return 'fas fa-snowman';
    } else if (classArg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classArg === 'Mist') {
        return 'fas fa-smog';
    } else if (classArg === 'Thunderstorm' || classArg === 'Drizzle') {
        return 'fas fa-thunderstorm';
    } else {
        return 'fas fa-cloud-sun';
    }
}

function reset(){
    let input = document.getElementById('input-box');
    input.value = '';
}

//add zero if time<10
function addZero(i){
    if(i<10) {
        i = '0'+i;
    }
    return i;
}