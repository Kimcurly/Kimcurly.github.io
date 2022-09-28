import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import dayjs from 'dayjs';
import styled from 'styled-components';

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1, // 1 min
  maximumAge: 1000 * 3600 * 24, // 24 hour
};

const Weather = ({ year, month, day }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prevDay, setPrevDay] = useState(true);

  const API_KEY = '1c1ce1ea53916a33dd41f418dfa3de47';
  const selectedDate = sessionStorage.getItem('selectedDate')
    ? JSON.parse(sessionStorage.getItem('selectedDate')).substr(0, 10)
    : null;
  const location = useCurrentLocation(geolocationOptions);
  console.log(location);
  console.log(location.latitude === undefined);

  const lat = location.latitude;
  const lon = location.longitude;
  console.log(lat, lon);
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const currentHour = dayjs().get('h');
  const selectedCellDay = dayjs(`${year}-${month}-${day}`);

  console.log(url);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!lat || !lon) return;
      try {
        setError(null);
        setWeather(null);
        setLoading(true);
        setPrevDay(true);
        const response = await axios.get(url);
        if (selectedCellDay.isBefore(dayjs())) {
          if (!selectedCellDay.isSame(dayjs(), 'day')) {
            setPrevDay(false);
          }
        }
        setWeather(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchWeather();
  }, [lat, lon, url]);
  console.log(prevDay);
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!weather) return null;
  if (!prevDay) return null;

  const fiveDaysWeather = weather.list;

  const filterDay = (list) => {
    if (Number(list.dt_txt.substr(11, 2)) % 3 === 0) return true;
  };

  const secondFilterDay = () => {
    if ((currentHour - 1) % 3 === 0) {
      return currentHour - 1;
    } else if ((currentHour - 2) % 3 === 0) {
      return currentHour - 2;
    } else {
      return currentHour;
    }
  };
  console.log(fiveDaysWeather);

  const handleSelectedDayTemp = () => {
    const firstFilterdDay = fiveDaysWeather
      .filter(
        (list) =>
          list.dt_txt.substr(0, 10) ===
          weatherDate.add(1, 'day').format('YYYY-MM-DD'),
      )
      .filter(filterDay);
    console.log(firstFilterdDay);

    // 기존의 secondFilterDay 를 현재 thirdFilterDay 로 바꾸는 리팩토링 작업 필요.
    const secondFilterdDay =
      secondFilterDay() === currentHour
        ? firstFilterdDay.filter(
            (list) => Number(list.dt_txt.substr(11, 2)) === currentHour,
          )
        : secondFilterDay() === currentHour - 1
        ? firstFilterdDay.filter(
            (list) => Number(list.dt_txt.substr(11, 2)) === currentHour - 1,
          )
        : secondFilterDay() === currentHour - 2
        ? firstFilterdDay.filter(
            (list) => Number(list.dt_txt.substr(11, 2)) === currentHour - 2,
          )
        : firstFilterdDay.filter(
            (list) => Number(list.dt_txt.substr(11, 2)) === currentHour,
          );
    console.log(secondFilterdDay);
    return secondFilterdDay.map((data) => {
      return data.main.temp;
    });
  };

  const weatherDate = dayjs(selectedDate);
  const selectedDayTemp = Math.round(...handleSelectedDayTemp());
  const selectedDayTempMaxArr = fiveDaysWeather
    .filter(
      (list) =>
        list.dt_txt.substr(0, 10) ===
        weatherDate.add(1, 'day').format('YYYY-MM-DD'),
    )
    .map((data) => {
      return data.main.temp_max;
    });
  const selectedDayTempMinArr = fiveDaysWeather
    .filter(
      (list) =>
        list.dt_txt.substr(0, 10) ===
        weatherDate.add(1, 'day').format('YYYY-MM-DD'),
    )
    .map((data) => {
      return data.main.temp_min;
    });
  console.log(selectedDayTemp);

  const selectedDayTempMax = Math.round(Math.max(...selectedDayTempMaxArr));
  const selectedDayTempMin = Math.round(Math.min(...selectedDayTempMinArr));

  console.log(selectedDayTempMaxArr, selectedDayTempMinArr);

  return (
    <>
      <WeatherContainer>
        {`${selectedDayTemp}°`}
        {`${selectedDayTempMax}°`}
        {`${selectedDayTempMin}°`}
      </WeatherContainer>
    </>
  );
};

export default Weather;
