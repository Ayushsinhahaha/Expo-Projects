"use client"

import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

// Mock weather data
const mockWeatherData = {
  current: {
    temp: 72,
    feels_like: 70,
    humidity: 65,
    wind_speed: 8,
    weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
  },
  daily: [
    { dt: Date.now() + 86400 * 1000, temp: { day: 74, min: 65, max: 78 }, weather: [{ main: "Clear", icon: "01d" }] },
    { dt: Date.now() + 86400 * 2000, temp: { day: 70, min: 62, max: 75 }, weather: [{ main: "Clouds", icon: "02d" }] },
    { dt: Date.now() + 86400 * 3000, temp: { day: 68, min: 60, max: 72 }, weather: [{ main: "Rain", icon: "10d" }] },
    { dt: Date.now() + 86400 * 4000, temp: { day: 65, min: 58, max: 69 }, weather: [{ main: "Rain", icon: "09d" }] },
    { dt: Date.now() + 86400 * 5000, temp: { day: 69, min: 60, max: 73 }, weather: [{ main: "Clouds", icon: "03d" }] },
  ],
}

// Mock locations for search
const mockLocations = [
  { name: "New York", country: "US" },
  { name: "London", country: "UK" },
  { name: "Tokyo", country: "JP" },
  { name: "Paris", country: "FR" },
  { name: "Sydney", country: "AU" },
]

export default function App() {
  const [weather, setWeather] = useState(mockWeatherData)
  const [location, setLocation] = useState("San Francisco")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  // Simulate API call when location changes
  useEffect(() => {
    if (location) {
      setLoading(true)
      // In a real app, you would fetch data from a weather API here
      setTimeout(() => {
        setWeather(mockWeatherData)
        setLoading(false)
      }, 1000)
    }
  }, [location])

  // Simulate search API
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Filter mock locations based on search query
      const filtered = mockLocations.filter((loc) => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  // Get weather icon URL
  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  // Get background color based on temperature
  const getBackgroundColor = (temp) => {
    if (temp > 80) return "#FF9E80" // Hot
    if (temp > 70) return "#82B1FF" // Warm
    if (temp > 60) return "#B2DFDB" // Mild
    return "#B3E5FC" // Cool
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: getBackgroundColor(weather.current.temp) }]}>
        <StatusBar style="auto" />

        {/* Search Bar */}
        {showSearch ? (
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <TouchableOpacity onPress={() => setShowSearch(false)} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a city"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                  <Feather name="x" size={24} color="gray" />
                </TouchableOpacity>
              )}
            </View>

            {/* Search Results */}
            <ScrollView style={styles.resultsContainer}>
              {searchResults.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.resultItem}
                  onPress={() => {
                    setLocation(item.name)
                    setShowSearch(false)
                    setSearchQuery("")
                  }}
                >
                  <Feather name="map-pin" size={20} color="gray" />
                  <View style={styles.resultTextContainer}>
                    <Text style={styles.resultText}>{item.name}</Text>
                    <Text style={styles.resultSubtext}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.locationText}>{location}</Text>
              <TouchableOpacity onPress={() => setShowSearch(true)}>
                <Feather name="search" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Weather Content */}
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading weather data...</Text>
              </View>
            ) : (
              <ScrollView contentContainerStyle={styles.weatherContainer} showsVerticalScrollIndicator={false}>
                {/* Current Weather */}
                <View style={styles.currentWeather}>
                  <Image source={{ uri: getWeatherIcon(weather.current.weather[0].icon) }} style={styles.weatherIcon} />
                  <Text style={styles.temperature}>{Math.round(weather.current.temp)}°</Text>
                  <Text style={styles.weatherDescription}>{weather.current.weather[0].main}</Text>
                  <Text style={styles.feelsLike}>Feels like {Math.round(weather.current.feels_like)}°</Text>
                </View>

                {/* Weather Details */}
                <View style={styles.weatherDetails}>
                  <View style={styles.detailItem}>
                    <Feather name="wind" size={24} color="black" />
                    <Text style={styles.detailValue}>{weather.current.wind_speed} mph</Text>
                    <Text style={styles.detailLabel}>Wind</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Feather name="droplet" size={24} color="black" />
                    <Text style={styles.detailValue}>{weather.current.humidity}%</Text>
                    <Text style={styles.detailLabel}>Humidity</Text>
                  </View>
                </View>

                {/* Forecast */}
                <Text style={styles.forecastTitle}>5-Day Forecast</Text>
                <View style={styles.forecast}>
                  {weather.daily.map((day, index) => (
                    <View key={index} style={styles.forecastDay}>
                      <Text style={styles.forecastDate}>{formatDate(day.dt)}</Text>
                      <Image source={{ uri: getWeatherIcon(day.weather[0].icon) }} style={styles.forecastIcon} />
                      <View style={styles.forecastTemp}>
                        <Text style={styles.forecastHigh}>{Math.round(day.temp.max)}°</Text>
                        <Text style={styles.forecastLow}>{Math.round(day.temp.min)}°</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  locationText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  weatherContainer: {
    padding: 20,
    alignItems: "center",
  },
  currentWeather: {
    alignItems: "center",
    marginBottom: 30,
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  temperature: {
    fontSize: 80,
    fontWeight: "bold",
  },
  weatherDescription: {
    fontSize: 24,
    marginVertical: 5,
  },
  feelsLike: {
    fontSize: 16,
    color: "#555",
  },
  weatherDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    padding: 15,
  },
  detailItem: {
    alignItems: "center",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: "#555",
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  forecast: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    padding: 15,
  },
  forecastDay: {
    alignItems: "center",
  },
  forecastDate: {
    fontSize: 14,
    marginBottom: 5,
  },
  forecastIcon: {
    width: 40,
    height: 40,
  },
  forecastTemp: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  forecastHigh: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  forecastLow: {
    fontSize: 16,
    color: "#555",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultTextContainer: {
    marginLeft: 10,
  },
  resultText: {
    fontSize: 16,
  },
  resultSubtext: {
    fontSize: 14,
    color: "gray",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
})
