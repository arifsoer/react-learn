import { useState } from "react";
import axios from "../../axios";
import moment from "moment";

import "./main.css";

import WeatherTableBody from "./WeatherTable";

const API_KEY = "27b2eec7550ffca976e7c9763e3d17de";

function App() {
  const [datas, setDatas] = useState([]);
  const [inputCity, setInputCity] = useState("");

  const [cityOption, setCityOption] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});

  const getTheCityOptions = async () => {
    try {
      const coordinate = await axios.get(
        `/geo/1.0/direct?q=${inputCity}&limit=5&appid=${API_KEY}`
      );
      const mapedCityOption = coordinate.data.map((dt) => {
        return {
          ...dt,
          name: `${dt.name}, ${dt.state}`,
        };
      });
      setCityOption(mapedCityOption);
      setSelectedCity(mapedCityOption[0]);
      getWeatherData(mapedCityOption[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const citySelectHandler = (event) => {
    try {
      setSelectedCity(cityOption[event.target.value]);
      getWeatherData(cityOption[event.target.value]);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherData = async (city) => {
    try {
      const weatherResponse = await axios.get(
        `/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`
      );
      const weatherData = weatherResponse.data.list.map((wd) => {
        const mt = moment.unix(wd.dt);
        return {
          city: city.name,
          description: wd.weather.length <= 0 ? "" : wd.weather[0].description,
          date: mt.calendar() + ` (${mt.format("MMMM DD, YYYY")})`,
        };
      });
      setDatas(weatherData);
    } catch (error) {
      console.log(error);
    }
  };

  // const setDataHandler = async () => {
  //   try {
  //     // we need to find coordinate
  //     const coordinate = await axios.get(
  //       `/geo/1.0/direct?q=${inputCity}&limit=5&appid=${API_KEY}`
  //     );
  //     const cityData = coordinate.data[0];
  //     const weatherResponse = await axios.get(
  //       `/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&appid=${API_KEY}`
  //     );
  //     const weatherData = weatherResponse.data.list.map((wd) => {
  //       return {
  //         city: cityData.name,
  //         description: wd.weather.length <= 0 ? "" : wd.weather[0].description,
  //         date: moment.unix(wd.dt).format("MMMM DD, YYYY"),
  //       };
  //     });
  //     setDatas(weatherData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <h1>Weather Description</h1>
      <div className="Seach-box">
        <label>City :</label>
        <input
          type="text"
          value={inputCity}
          onChange={(value) => {
            setInputCity(value.target.value);
          }}
        />
        <button onClick={getTheCityOptions}>Search</button>
      </div>
      <div className="Radio-group">
        {cityOption.map((co, ind) => (
          <div key={ind + "op"}>
            <input
              type="radio"
              name={Math.random()+ind}
              checked={cityOption.indexOf(selectedCity) === ind}
              onChange={citySelectHandler}
              value={ind}
            />
            <label>{co.name}</label>
          </div>
        ))}
      </div>
      <WeatherTableBody datas={datas} />
    </div>
  );
}

export default App;
