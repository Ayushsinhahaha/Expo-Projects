import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
// import axios from 'axios';

const API_KEY = 'YOUR_API_KEY_HERE';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          },
        }
      );
      setWeather(response.data);
      setError(null);
      Keyboard.dismiss();
    } catch (err) {
      setError('City not found.');
      setWeather(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        placeholder="Enter city"
        style={styles.input}
        value={city}
        onChangeText={setCity}
        onSubmitEditing={fetchWeather}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default WeatherApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3d59',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#ff6e40',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  weatherContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  city: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 50,
    color: '#fff',
  },
  desc: {
    fontSize: 20,
    color: '#ddd',
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
