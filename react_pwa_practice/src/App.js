import React, { Component } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      weather: "",
    };
  }
  search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(this.state.query);

      console.log("check data======>", data);
      this.setState({
        weather: data,
        query: "",
      });
    }
  };
  render() {
    const query = this.state.query;
    const weather = this.state.weather;
    return (
      <div className="main-container">
        <input
          type="text"
          className="search"
          placeholder="Search ..."
          value={query}
          onChange={(e) =>
            this.setState({
              query: e.target.value,
            })
          }
          onKeyPress={this.search}
        />
        {weather.main && (
          <div className="city">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup> {weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
