import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './reducers/weatherReducer';
import themeReducer from './reducers/themeReducer';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Вимикаємо перевірку на незмінність стану, щоб уникнути уповільнення
      immutableCheck: false,
      // За бажанням, можна вимкнути й перевірку на серіалізованість
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
