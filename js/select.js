class Storage {
    'use strict'
    // convert objects into json
    convertToJson(object)
    {
    let jsonObject = JSON.stringify(object)
    return jsonObject
    }

    // Get Items from local storage
    getStorage(item)
    {
    let JSONobject = localStorage.getItem(item);
    return JSON.parse(JSONobject)
    }

    // Set Items to local storage
    setStorage(item, list)
    {
    let jsonObject = this.convertToJson(list)
    //console.log(jsonObject)
    localStorage.setItem(item, jsonObject);
    }
}

//Use Storage Class in functions down below
let storage = new Storage()


/*****************************************
 * CONVERT TO FAHERHEIT
 * Convert from Kelvin to Faherheit
 * ***************************************/
function convertToFaherheit(temp)
{
    return ((temp - 273.15)* 1.8000 + 32.00).toFixed(1);
}

/*****************************************
  * ADD WEATHER
  * Add the Five day Forecast to Page
  * ***************************************/
function addWeather(arrayMaxTemp, arrayMinTemp, iconsrc, date)
{
    let forecastBox = document.querySelector("#forecast_box");
    forecastBox.innerHTML = 
    `<div class="day_box">
    <h3 id="date"> ${date.getMonth() + 1}/${date.getDate()}</h3>
        <img src="${iconsrc[0]}" class = "fiveDayIcon">
        <p class="highLow"><span>${arrayMaxTemp[0]}</span> &deg;F / <span>${arrayMinTemp[0]}</span> &deg;F</p>
    </div>

    <div class="day_box">
        <h3 id="date">${date.getMonth() + 1}/${date.getDate() + 1} </h3>
        <img src="${iconsrc[1]}" class = "fiveDayIcon">
        <p class="highLow"><span>${arrayMaxTemp[1]}</span> &deg;F / <span>${arrayMinTemp[1]}</span> &deg;F</p>
    </div>

    <div class="day_box">
        <h3 id="date">${date.getMonth() + 1}/${date.getDate() + 2} </h3>
        <img src="${iconsrc[2]}" class = "fiveDayIcon">
        <p class="highLow"><span>${arrayMaxTemp[2]}</span> &deg;F / <span>${arrayMinTemp[2]}</span> &deg;F</p>
    </div>

    <div class="day_box">
        <h3 id="date">${date.getMonth() + 1}/${date.getDate() + 3} </h3>
        <img src="${iconsrc[3]}" class = "fiveDayIcon">
        <p class="highLow"><span>${arrayMaxTemp[3]}</span> &deg;F / <span>${arrayMinTemp[3]}</span> &deg;F</p>
    </div>
 
    <div class="day_box">
        <h3 id="date">${date.getMonth() + 1}/${date.getDate() + 4} </h3>
        <img src="${iconsrc[4]}" class = "fiveDayIcon">
        <p class="highLow"><span>${arrayMaxTemp[4]}</span> &deg;F / <span>${arrayMinTemp[4]}</span> &deg;F</p>
    </div>`;
}

/*****************************************
  * ADD TODAYS WEATHER
  * Add a single day of weather
  * ***************************************/
function addTodayWeather(jsObject, dailyTemp, iconArray)
{
    let forecastBox = document.querySelector("#day_forecast");
    forecastBox.innerHTML = 
    `            <h1 id="dailyHeading">Today's Forecast</h1>

    <img src="${iconArray[0]}" alt="Weather Icon" id="todayIcon">

    <div id="weatherInfo">
    <p id="weatherTemp">Temperature: ${dailyTemp} Degrees</p>
    <p id="weatherDesc">${jsObject.list[0].weather[0].description}</p>
    <p id="weatherWind">The wind is ${jsObject.list[0].wind.speed} MPH</p>
    
    </div>`;
}

/*****************************************
  * GET Max TEMPERATURE LIST
  * Get the List of Max temperatures so we can 
  * display them
  * ***************************************/
function getMaxTempList(jsObject)
{
    console.log(jsObject)
     //NOTE THERE IS 8 SPACES IMBETWEEN DAYS
    let arrayMaxTemp = []
    let count = 0;
        for(let tem in jsObject.list)
        {
            //Generate Each days temps
            if (count == 0 || count == 8 || count == 16 || count == 24 || count == 32)
                {
                    let tempF = convertToFaherheit(jsObject.list[tem].main.temp_max)
                    arrayMaxTemp.push(tempF)                   
                }
            count ++;
        }   

        console.table(arrayMaxTemp)
        return arrayMaxTemp;
}


/*****************************************
  * GET Min TEMPERATURE LIST
  * Get the List of Min temperatures so we can 
  * display them
  * ***************************************/
function getMinTempList(jsObject)
{
    console.log(jsObject)
       //NOTE THERE IS 8 SPACES IMBETWEEN DAYS
    let arrayMinTemp = []
    let count = 0;
        for(let tem in jsObject.list)
        {
            //Generate Each days temps
            if (count == 0 || count == 8 || count == 16 || count == 24 || count == 32)
                {
                    let tempF = convertToFaherheit(jsObject.list[tem].main.temp_min)
                    arrayMinTemp.push(tempF)                   
                }
            count ++;
        }   

        console.table(arrayMinTemp)
        return arrayMinTemp;
    }


/*****************************************
  * GET ICON LIST
  * Get the List of icons so we can 
  * display them
  * ***************************************/
function getIconList(jsObject)
 {
     //NOTE THERE IS 8 SPACES IMBETWEEN DAYS
    let arrayIcon = []
    let count = 0;
        for(let pic in jsObject.list)
        {
             //Generate Each days temps
            if (count == 0 || count == 8 || count == 16 || count == 24 || count == 32)
                {
                    let iconPic = `https://openweathermap.org/img/w/${jsObject.list[pic].weather[0].icon}.png`
                    arrayIcon.push(iconPic)                   
                }
            count ++;
        }   
        return arrayIcon;
}

/*****************************************
  * DISPLAY WEATHER
  * Will Begin building th eweather forecast blocks
  * ***************************************/
function displayWeather()
{
    let url = storage.getStorage("Url")
    return fetch(url)
    .then(response =>response.json())
    .then(jsObject => {
         //Get Array of Max Temp
        let arrayMaxTemp = getMaxTempList(jsObject);
         //console.table(arrayMaxTemp)

         //Get Array of Min Temp
        let arrayMinTemp = getMinTempList(jsObject);
         //console.table(arrayMinTemp)
 
         //Get Array of Icons
        let arrayIcon = getIconList(jsObject);
         //console.table(arrayIcon)
 
        let date = new Date()
        addWeather(arrayMaxTemp, arrayMinTemp, arrayIcon, date);

        let dailyTemp = convertToFaherheit(jsObject.list[0].main.temp)
        addTodayWeather(jsObject,dailyTemp,arrayIcon);
     });
 }


/*****************************************
  * CREATE OBJECT LIST
  * Create object and store it
  * ***************************************/
function createObjectList()
{
    //List of cities
    let urlList = [
        {
            "city" : "https://api.openweathermap.org/data/2.5/forecast?lat=43.826073&lon=-111.789536&appid=c2e08ce85fa8ed0115b03b7b5575df7f",
            "name" : "Rexburg Idaho"
        },
        {
            "city" : "https://api.openweathermap.org/data/2.5/forecast?lat=41.743546&lon=-111.83585&appid=c2e08ce85fa8ed0115b03b7b5575df7f",
            "name" : "Logan Utah"
        },
        {
            "city" : "https://api.openweathermap.org/data/2.5/forecast?lat=47.267418&lon=-122.4673&appid=c2e08ce85fa8ed0115b03b7b5575df7f",
            "name" : "Tacoma Washington"
        }
        ];

        //Store Object
        storage.setStorage("Item", urlList);
}

/*****************************************
 * RETRIVE URL
 * Get the Url from Local Storage
 * ***************************************/
 function retriveUrl(selectNum)
 {
    
    console.log(selectNum)
     //Get object from Storage
     let object = storage.getStorage("Item")
     //console.log(object[0].city)

    //Go through the objects and find the correct link to display
    for(let i = 0; i < object.length; i++)
    {
        if (object[i].city == object[selectNum].city)
        {
            // console.log("Found it!")
            // console.log(object[i])
            //Display name of City
            document.querySelector("#cityHeader").textContent = object[i].name;

            storage.setStorage("Url", object[i].city )
            console.log(object[i].city)
        }
    }
 }

  /*****************************************
  * UPDATE
  * Get the Selected URL and send it to rest of program
  * ***************************************/
function update() {
    console.log("UPDATE")
    var select = document.getElementById('city_dropdown');
    var option = select.options[select.selectedIndex];
    console.log(parseInt(option.value))
    retriveUrl(parseInt(option.value))
    displayWeather()

}

/*****************************************
 * MAIN
 * Start the program
 * ***************************************/

function main()
{
    //Create list of weather API's
    createObjectList();

    update()

}

main()