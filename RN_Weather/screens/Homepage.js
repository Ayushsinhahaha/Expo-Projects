import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

const API_KEY = "";
const Homepage = () => {
  const currentDate = new Date().toLocaleDateString();

  // useStates
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("null");
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
        Keyboard.dismiss();
      }
    } catch (error) {
      setError("Something went Wrong!!");
      setWeather(null);
    }
  };

  // useEffect(() => {}, [fetchWeather]);

  const clearResponse = () => {
    setWeather(null);
    setCity("");
    setError(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/worldmap.jpg")}
        style={{ height: "100%", width: "100%" }}
        resizeMode="cover"
      >
        {/* Header */}
        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "white",
            height: 90,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          {/* Left Box */}
          <View style={{ padding: 15 }}>
            <Text style={{ color: "white", fontWeight: "800", fontSize: 20 }}>
              {currentDate}
            </Text>
            {/* Location */}
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/map.png")}
                style={{ height: 30, width: 30 }}
              />
              <Text style={{ color: "white", fontSize: 20, fontWeight: "800" }}>
                Location
              </Text>
            </View>
          </View>
          {/* Right Box */}
          <View
            style={{
              borderWidth: 1,
              borderColor: "white",
              height: 40,
              width: "30%",
              alignSelf: "center",
              marginRight: 20,
              borderRadius: 20,
            }}
          ></View>
        </View>

        {/* Enter Location */}

        <View
          style={{
            alignSelf: "center",
            width: "80%",
            height: 60,
            borderWidth: 1,
            borderColor: "white",
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            value={city}
            onChangeText={setCity}
            onSubmitEditing={fetchWeather}
            placeholder="Enter City"
            placeholderTextColor={"white"}
            style={{
              paddingHorizontal: 10,
              width: "80%",
              height: 60,
              color: "white",
            }}
          />
          <TouchableOpacity onPress={fetchWeather}>
            <Image
              source={require("../assets/search.png")}
              style={{ height: 30, width: 30, marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        {/* Weather Details */}
        {weather && (
          <View
            style={{
              alignSelf: "center",
              width: "80%",
              borderWidth: 1,
              borderColor: "lightgrey",
              height: 300,
              marginTop: 200,
              backgroundColor: "lightgrey",
              opacity: 0.9,
              alignItems: "center",
            }}
          >
            {/* Location */}
            <Text style={{ color: "white", fontSize: 36, fontWeight: "900" }}>
              {weather.name}
            </Text>
            {weather !== null && (
              <View>
                <Text>{weather.main?.temp} °C</Text>
                <Text>{weather.weather[0]?.description}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={clearResponse}
              style={{ marginTop: 30, borderWidth: 1, padding: 10 }}
            >
              <Text>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Homepage;

const styles = StyleSheet.create({});
