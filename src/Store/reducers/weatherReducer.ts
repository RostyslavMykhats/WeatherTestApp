import {
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
    FETCH_FORECAST_SUCCESS,
    FETCH_FORECAST_FAILURE,
    WeatherActionTypes,
  } from '../actions/weatherActions';
  import { WeatherData, ForecastData } from '../../Types/weatherTypes';
  
  interface WeatherState {
    current: WeatherData | null;
    forecast: ForecastData | null;
    error: string | null;
  }
  
  const initialState: WeatherState = {
    current: null,
    forecast: null,
    error: null,
  };
  
  const weatherReducer = (state = initialState, action: WeatherActionTypes): WeatherState => {
    switch (action.type) {
      case FETCH_WEATHER_SUCCESS:
        return { ...state, current: action.payload, error: null };
      case FETCH_WEATHER_FAILURE:
        return { ...state, current: null, error: action.payload };
      case FETCH_FORECAST_SUCCESS:
        return { ...state, forecast: action.payload, error: null };
      case FETCH_FORECAST_FAILURE:
        return { ...state, forecast: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default weatherReducer;
  