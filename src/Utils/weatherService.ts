import axios from 'axios';
import { WeatherData, ForecastData } from '../Types/weatherTypes';

const API_KEY = '51dae939fdb44ad282f103607230707';
const BASE_URL = 'http://api.weatherapi.com/v1';

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching weather data: ${error.response?.data?.error?.message || error.message}`);
    } else {
      throw new Error('An unexpected error occurred while fetching weather data');
    }
  }
};

export const getForecast = async (city: string, days: number): Promise<ForecastData> => {
  try {
    const response = await axios.get<ForecastData>(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching forecast data: ${error.response?.data?.error?.message || error.message}`);
    } else {
      throw new Error('An unexpected error occurred while fetching forecast data');
    }
  }
};
