import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [err, setErr] = useState(false);


    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "fef51ae46ab99d566f8ab417219cff62";

    let getweatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            };
            return result;

        } catch (error) {
            throw error;
        }
    }

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            setCity("");
            setErr(false);
            let newInfo = await getweatherInfo();
            updateInfo(newInfo);
        } catch (error) {
            setErr(true);
        }
    }

    return (
        <div>
            <h3>Search City Weather</h3>
            <form onSubmit={handleSubmit} >
                <TextField id="city" label="Search City" variant="standard" value={city} onChange={handleChange} required />
                <br /><br />
                <Button variant="contained" endIcon={<SearchIcon />} type='submit'>Search
                </Button>

                {err && <p style={{color:"red"}}>City not found. Please try again.</p>}
            </form>
        </div>
    );
}