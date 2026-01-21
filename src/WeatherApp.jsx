import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp(){
    const [weatherinfo,setWeatherinfo] = useState({
        city: "Mumbai",
        feelsLike: 26.91,
        humidity: 25,
        temp: 28.03,
        tempMax: 28.03,
        tempMin: 28.03,
        weather: "clear sky",
    });

    let updateInfo = (newInfo)=>{
        setWeatherinfo(newInfo);
    }

    return(
        <div className="weather-app">
            <h2>Weather Forecast</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherinfo}/>
        </div>
    );
}