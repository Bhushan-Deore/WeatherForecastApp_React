import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


export default function InfoBox({ info }) {
    const unsplashAppID = 860610;
    const unsplashAccKey = "AC7BadD2MoyL17T0z5EvJBexj2omPUbCjqY0xKVImwA";
    const unsplashSecKey = "48o2e1vwJwdHOaE7-PtNihOi9EOdFxAzO9GvvulYTkc";

    const [imgUrl, setImgUrl] = useState("");

    function buildSearchQuery(city, weather) {
        return `${city} ${weather} weather`;
    }

    let getWeatherImage = async (city, weather) => {
        const query = buildSearchQuery(city, weather);
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${unsplashAccKey}`
        );

        const data = await response.json();
        setImgUrl(data.results[0].urls.regular);
    }

    useEffect(() => {
        if (info?.city && info?.weather) {
            getWeatherImage(info.city, info.weather);
        }
    }, [info.city, info.weather]);

    return (
        <div>
            <h3>Current Weather</h3>
            <Card sx={{ maxWidth: "90vw" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={imgUrl}
                        alt={info.weather}
                        className="weather-image"
                    />
                    <CardContent>
                        <Typography gutterBottom className="weather-city">
                            {info.city}
                        </Typography>
                        <div className="weather-details">
                            <p>Temperature: {info.temp}°C</p>
                            <p>Humidity: {info.humidity}%</p>
                            <p>Min Temp: {info.tempMin}°C</p>
                            <p>Max Temp: {info.tempMax}°C</p>
                            <p>
                                Weather: <b>{info.weather}</b>, feels like {info.feelsLike}°C
                            </p>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}