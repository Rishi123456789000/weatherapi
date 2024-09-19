import axios from "axios";
import { Component } from "react";

export class Weather extends Component {
  state = {
    data: {}
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          this.fetch(latitude, longitude);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }

  fetch = async (lat, lon) => {
    try {
      const newData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3d96b76bd18d71a187462ececa7bfe11`
      );
      this.setState({
        data: newData.data
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  render() {
    const { data } = this.state;
    const { name, main } = data || {}; 
  
    return (
      <>
        {name && main ? (
          <>
            <h1>Name: {name}</h1>
            <h1>Humidity: {main.humidity}</h1>
            <h1>Pressure: {main.pressure}</h1>
            <h1>Temperature: {main.temp}</h1>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </>
    );
  }
}
