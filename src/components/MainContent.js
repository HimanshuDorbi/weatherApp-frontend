import React from "react";
import Forecast from "./Forcast"; // Import the updated Forecast component
import "../components/MainContent.css";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    // Initialize forecasts with data from localStorage if available
    this.forecasts = JSON.parse(localStorage.getItem("forecasts")) || [];
    this.state = { allForecasts: this.forecasts, modified: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  // Function to save forecasts data to localStorage
  saveToLocalStorage(data) {
    localStorage.setItem("forecasts", JSON.stringify(data));
  }

  renderForecasts() {
    const { allForecasts } = this.state;

    if (allForecasts.length === 0) {
      return <h3>No forecasts to show</h3>;
    }

    return allForecasts.map((forecast, index) => (
      <Forecast key={index} city={forecast.city} />
    ));
  }

  handleClick(event) {
    this.getWeatherData();
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.getWeatherData();
    }
  }

  getWeatherData() {
    const el = document.querySelector("input[type='text']");
    if (el.value === "") return;

    const locName = el.value;
    const apiKey = "d36d1a9684497f5c9e2ffe7d69c197ed"; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      locName
    )}&units=metric&cnt=5&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const date = new Date();
        const time_now = date.getHours() + ":" + date.getMinutes();
        this.forecasts.push({
          city: locName,
          time_now,
          consolidated_weather: data.list,
        });

        if (this.forecasts.length > 3) {
          this.forecasts.shift();
        }

        // Update state and save to localStorage
        this.setState({ allForecasts: this.forecasts }, () => {
          this.saveToLocalStorage(this.forecasts);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div className="tagline">
          <h1>Get 5-Day Weather Forecast</h1>
        </div>
        <div>
          <input
            className="text_input"
            type="text"
            name="search"
            placeholder="Search for location"
            onKeyPress={this.handleKeyPress} // Call handleKeyPress on Enter key press
          />
          <button
            className="button"
            type="button"
            name="button"
            value="getWeather"
            onClick={this.handleClick}
          >
            Get Weather
          </button>
        </div>
        <div className="all-forecasts">{this.renderForecasts()}</div>
      </div>
    );
  }
}

export default MainContent;
