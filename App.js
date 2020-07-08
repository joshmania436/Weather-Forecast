import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class WeatherScreen extends Component {
  constructor() {
    super();
    this.state = {
      weather: '',
    };
  }

  getWeather = async () => {
    // for getting automatic location updates
    var url;
    if ('geolocation' in navigator) {
      console.log(' GEOLOCATION AVAILABLE');
      navigator.geolocation.getCurrentPosition(position => {
        console.log(`Latitude${position.coords.latitude},Longitude${position.coords.longitude}`);
        url = `https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;

      })
    }
    //change latitude and longitude
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          weather: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getWeather();
  };

  render() {
    // destructured the weather state so to write only weather instead of this.state.weather
    const { weather } = this.state
    if (weather === '') {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.title}>
              Weather Forecast
            </Text>
            <Image
              style={styles.cloudImage}
              source={require('./weatherImg.png')}
            />
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 18 }}>
                {weather.main.temp}&deg;C
            </Text>
              <Text style={{ fontSize: 20, margin: 10 }}>
                humidity : {weather.main.humidity}
              </Text>
              <Text style={{ fontSize: 20 }}>
                {weather.weather[0].description}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center'
  },
  title: {
    marginTop: 50,
    fontSize: 30,
  },
  cloudImage: {
    width: 200,
    height: 200,
    marginTop: 30
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -150
  }
});

