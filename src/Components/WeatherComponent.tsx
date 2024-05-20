import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, fetchForecast } from '../Store/actions/weatherActions';
import { RootState } from '../store/store';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';

const WeatherComponent: React.FC<{ locale: { latitude: number, longitude: number } }> = ({ locale }) => {
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.weather.current);
  const forecast = useSelector((state: RootState) => state.weather.forecast);
  const error = useSelector((state: RootState) => state.weather.error);
  const isDarkTheme = useSelector((state: RootState) => state.theme.isDarkTheme);

  useEffect(() => {
    dispatch(fetchWeather(`${locale.latitude},${locale.longitude}`));
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkTheme ? '#2c3e50' : '#ecf0f1' }]}>
      {error && <Text style={[styles.error, { color: isDarkTheme ? '#ecf0f1' : '#e74c3c' }]}>{error}</Text>}
      {weather && (
        <View style={styles.currentWeather}>
          <Image source={{ uri: `https:${weather.current.condition.icon}` }} style={styles.icon} />
          <Text style={[styles.temperature, { color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }]}>{weather.current.temp_c}°C</Text>
          <Text style={[styles.condition, { color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }]}>{weather.current.condition.text}</Text>
        </View>
      )}
      <View style={styles.buttons}>
        <Button
          title="1 Day Forecast"
          onPress={() => dispatch(fetchForecast(`${locale.latitude},${locale.longitude}`, 1))}
        />
        <Button
          title="2 Days Forecast"
          onPress={() => dispatch(fetchForecast(`${locale.latitude},${locale.longitude}`, 2))}
        />
        <Button
          title="3 Days Forecast"
          onPress={() => dispatch(fetchForecast(`${locale.latitude},${locale.longitude}`, 3))}
        />
      </View>
      <View style={styles.forecast}>
        {forecast && forecast.forecast.forecastday.map(day => (
          <View key={day.date} style={styles.forecastItem}>
            <Text style={[styles.date, { color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }]}>{day.date}</Text>
            <Image source={{ uri: `https:${day.day.condition.icon}` }} style={styles.forecastIcon} />
            <Text style={[styles.avgTemp, { color: isDarkTheme ? '#ecf0f1' : '#2c3e50' }]}>{day.day.avgtemp_c}°C</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
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
  buttons: {
    marginBottom: 20,
  },
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
  error: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WeatherComponent;