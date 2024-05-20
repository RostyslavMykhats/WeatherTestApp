import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CurrentWeather: React.FC<{ weather: any, isDarkTheme: boolean }> = ({ weather, isDarkTheme }) => (
  <View style={styles.currentWeather}>
    <Image source={{ uri: `https:${weather.current.condition.icon}` }} style={styles.icon} />
    <Text style={[styles.temperature, { color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }]}>{weather.current.temp_c}°C</Text>
    <Text style={[styles.condition, { color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }]}>{weather.current.condition.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  currentWeather: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 24,
  },
});

export default CurrentWeather;
