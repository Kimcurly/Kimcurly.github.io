import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = 'e4e220c4d37040a7b13ac93fd78333de';
  const location = useCurrentLocation();
  console.log(location);
  console.log(location.latitude === undefined);

  const lat = location.latitude;
  const lon = location.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`;
  console.log(url);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setError(null);
        setWeather(null);
        setLoading(true);
        const response = await axios.get(url);
        setWeather(response.data);
        console.log(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchWeather();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!weather) return null;

  return <div>weather</div>;
};

export default Weather;
