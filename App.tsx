import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/Store/store';
import WeatherComponent from './src/Components/WeatherComponent';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Button, Platform, Text, View} from 'react-native';
import { toggleTheme } from './src/Store/actions/themeActions';


const App: React.FC = () => {
  const [locale, setLocale] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const result = await request(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          })
        );

        if (result === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocale({ latitude, longitude });
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          console.log('Location permission not granted');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);


  return (
    <Provider store={store}>
      <MainApp locale={locale}/>
    </Provider>
  );
};

const MainApp: any = ({locale}:any) => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state: any) => state.theme.isDarkTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkTheme ? '#2c3e50' : '#ecf0f1' }}>
      {locale ? (
        <WeatherComponent locale={locale} />
      ) : (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDarkTheme ? '#2c3e50' : '#ecf0f1',
        }}>
          <Text style={{
            color: isDarkTheme ? '#ecf0f1' : '#2c3e50',
          }}>Loading...</Text>
        </View>
      )}
      <Button title={`Switch to ${isDarkTheme ? 'Light' : 'Dark'} Theme`} onPress={handleToggleTheme} />
    </View>
  );
};

export default App;
