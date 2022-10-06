import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {
  faSun,
  faMoon,
  faCloudMoon,
  faCloudSun,
  faCloud,
  faCloudMeatball,
  faCloudRain,
  faCloudSunRain,
  faCloudMoonRain,
  faCloudBolt,
  faSnowflake,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const weatherIcon = [
  {
    code: '01d',
    icon: faSun,
  },
  {
    code: '01n',
    icon: faMoon,
  },
  {
    code: '02d',
    icon: faCloudSun,
  },
  {
    code: '02n',
    icon: faCloudMoon,
  },
  {
    code: '03',
    icon: faCloud,
  },
  {
    code: '04',
    icon: faCloudMeatball,
  },
  {
    code: '09',
    icon: faCloudRain,
  },
  {
    code: '10d',
    icon: faCloudSunRain,
  },
  {
    code: '10n',
    icon: faCloudMoonRain,
  },
  {
    code: '11',
    icon: faCloudBolt,
  },
  {
    code: '13',
    icon: faSnowflake,
  },
  {
    code: '50',
    icon: faSmog,
  },
];

console.log(weatherIcon);

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 50%;
`;

const TempContainer = styled.div`
  height: 33%;
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
    let isComponentMounted = true;

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
        if (isComponentMounted) {
          setWeather(response.data);
        }
      } catch (e) {
        console.log(e);
        setError(e);
      }

      setLoading(false);
    };

    fetchWeather();

    return () => {
      isComponentMounted = false;
    };
  }, [lat, lon, url]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!weather) return null;
  if (!prevDay) return null;

  const fiveDaysWeather = weather.list;
  const weatherDate = dayjs(selectedDate);

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

  const handleSelectedDay = () => {
    const firstFilterdDay = fiveDaysWeather
      .filter(
        (list) =>
          list.dt_txt.substr(0, 10) ===
          weatherDate.add(1, 'day').format('YYYY-MM-DD'),
      )
      .filter(filterDay);
    console.log(firstFilterdDay);

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

    return secondFilterdDay;
  };

  const iconCode = handleSelectedDay()[0].weather[0].icon;
  console.log(iconCode);

  let trimedIconCode =
    iconCode.substr(0, 2) === '01' ||
    iconCode.substr(0, 2) === '02' ||
    iconCode.substr(0, 2) === '10'
      ? iconCode
      : iconCode.substr(0, 2);
  console.log(trimedIconCode);

  const filteredIcon = weatherIcon.filter((element) => {
    return element.code === trimedIconCode;
  });
  console.log(filteredIcon[0].icon);

  const selectedDayTemp = Math.round(handleSelectedDay()[0].main.temp);
  const selectedDayDescription = handleSelectedDay()[0].weather[0].description;
  console.log(selectedDayDescription);

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
    <RootContainer>
      <WeatherContainer>
        <TempContainer>
          <FontAwesomeIcon icon={filteredIcon[0].icon} />
          &nbsp;
          {`${selectedDayTemp}°`}
        </TempContainer>
        <div>{selectedDayDescription}</div>
        {`최고: ${selectedDayTempMax}°`}
        &nbsp;
        {`최저: ${selectedDayTempMin}°`}
      </WeatherContainer>
    </RootContainer>
  );
};

export default Weather;
