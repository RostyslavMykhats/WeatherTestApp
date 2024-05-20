import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ForecastList: React.FC<{ forecast: any, isDarkTheme: boolean }> = ({ forecast, isDarkTheme }) => (
  <View style={styles.forecast}>
    {forecast.forecast.forecastday.map((day: any) => (
      <View key={day.date} style={styles.forecastItem}>
        <Text style={[styles.date, { color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }]}>{day.date}</Text>
        <Image source={{ uri: `https:${day.day.condition.icon}` }} style={styles.forecastIcon} />
        <Text style={[styles.avgTemp, { color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }]}>{day.day.avgtemp_c}°C</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  forecast: {
    marginTop: 20,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
  },
  date: {
    fontSize: 16,
  },
  forecastIcon: {
    width: 30,
    height: 30,
  },
  avgTemp: {
    fontSize: 16,
  },
});

export default ForecastList;
