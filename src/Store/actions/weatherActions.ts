import { Dispatch } from 'redux';
import { getWeather, getForecast } from '../../Utils/weatherService';
import { WeatherData, ForecastData } from '../../types/weatherTypes';

export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const FETCH_FORECAST_SUCCESS = 'FETCH_FORECAST_SUCCESS';
export const FETCH_FORECAST_FAILURE = 'FETCH_FORECAST_FAILURE';

interface FetchWeatherSuccessAction {
  type: typeof FETCH_WEATHER_SUCCESS;
  payload: WeatherData;
}

interface FetchWeatherFailureAction {
  type: typeof FETCH_WEATHER_FAILURE;
  payload: string;
}

interface FetchForecastSuccessAction {
  type: typeof FETCH_FORECAST_SUCCESS;
  payload: ForecastData;
}

interface FetchForecastFailureAction {
  type: typeof FETCH_FORECAST_FAILURE;
  payload: string;
}

export type WeatherActionTypes =
  | FetchWeatherSuccessAction
  | FetchWeatherFailureAction
  | FetchForecastSuccessAction
  | FetchForecastFailureAction;

export const fetchWeather = (city: string) => async (dispatch: Dispatch<WeatherActionTypes>) => {
  try {
    const data = await getWeather(city);
    dispatch({ type: FETCH_WEATHER_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: FETCH_WEATHER_FAILURE, payload: error.message });
  }
};

export const fetchForecast = (city: string, days: number) => async (dispatch: Dispatch<WeatherActionTypes>) => {
  try {
    const data = await getForecast(city, days);
    dispatch({ type: FETCH_FORECAST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: FETCH_FORECAST_FAILURE, payload: error.message });
  }
};
