import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { Button } from '@mui/material';
import {
  faSun,
  faMoon,
  faCloudMoon,
  faCloudSun,
  faCloud,
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
    icon: faSun,
  },
  {
    code: '02n',
    icon: faMoon,
  },
  {
    code: '03d',
    icon: faCloudSun,
  },
  {
    code: '03n',
    icon: faCloudMoon,
  },
  {
    code: '04',
    icon: faCloud,
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

const weatherDescription = [
  {
    id: '2xx',
    description: '뇌우',
  },
  {
    id: '3xx',
    description: '가랑비',
  },
  {
    id: '500',
    description: '비',
  },
  {
    id: '503',
    description: '폭우',
  },
  {
    id: '511',
    description: '우빙',
  },
  {
    id: '520',
    description: '소나기',
  },
  {
    id: '6xx',
    description: '눈',
  },
  {
    id: '701',
    description: '안개',
  },
  {
    id: '731',
    description: '황사',
  },
  {
    id: '771',
    description: '돌풍',
  },
  {
    id: '781',
    description: '태풍',
  },
  {
    id: '800',
    description: '맑음',
  },
  {
    id: '801',
    description: '대체로 맑음',
  },
  {
    id: '802',
    description: '대체로 흐림',
  },
  {
    id: '803',
    description: '대체로 흐림',
  },
  {
    id: '804',
    description: '흐림',
  },
];

const filteredThunderstormDescription = weatherDescription.filter(
  (element) => element.id === '2xx',
);
console.log(filteredThunderstormDescription[0].description);

const filteredDrizzleDescription = weatherDescription.filter(
  (element) => element.id === '3xx',
);
console.log(filteredDrizzleDescription[0].description);

const filteredRainDescription = weatherDescription.filter(
  (element) => element.id >= 500 && element.id < 600,
);
console.log(filteredRainDescription);
console.log(
  filteredRainDescription.filter((element) => Number(element.id) === 500),
);

const filteredSnowDescription = weatherDescription.filter(
  (element) => element.id === '6xx',
);
console.log(filteredSnowDescription[0].description);

const filteredAtmosphereDescription = weatherDescription.filter(
  (element) => element.id >= 700 && element.id < 800,
);
console.log(filteredAtmosphereDescription);

const filteredClearDescription = weatherDescription.filter(
  (element) => element.id === '800',
);
console.log(filteredClearDescription[0].description);

const filteredCloudsDescription = weatherDescription.filter(
  (element) => element.id >= 801,
);
console.log(filteredCloudsDescription);

const ErrorLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 8.6%;
`;

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
  const fourDaysUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const currentHour = dayjs().get('h');
  const selectedCellDay = dayjs(`${year}-${month}-${day}`);

  console.log(fourDaysUrl);

  useEffect(() => {
    if (!lat || !lon) return;
    setError(null);
    setLoading(true);
    setPrevDay(true);
    axios
      .all([axios.get(currentUrl), axios.get(fourDaysUrl)])
      .then(
        axios.spread((res1, res2) => {
          const today = res1.data;
          const fourDays = res2.data;
          const res = [today, fourDays];
          setLoading(false);
          console.log(res);
          setWeather(res);
        }),
      )
      .catch((e) => {
        console.log(e);
        setError(e);
      });
    if (selectedCellDay.isBefore(dayjs())) {
      if (!selectedCellDay.isSame(dayjs(), 'day')) {
        setPrevDay(false);
      }
    }

    return;
  }, [lat, lon, fourDaysUrl, currentUrl]);

  if (loading) return <ErrorLoadingContainer>로딩 중...</ErrorLoadingContainer>;
  if (error)
    return (
      <ErrorLoadingContainer>
        <div>에러가 발생했습니다.</div>
        <Button
          variant="text"
          onClick={() =>
            window.location.replace('/Kimcurly.github.io/index.html')
          }
        >
          새로고침
        </Button>
      </ErrorLoadingContainer>
    );

  if (!weather) return null;
  if (!prevDay) return null;

  const todayWeather = weather[0];
  const excludeTodayWeather = weather[1].list.filter(
    (element) => !dayjs(element.dt_txt.substr(0, 10)).isSame(dayjs(), 'day'),
  );

  console.log(todayWeather);
  console.log(excludeTodayWeather);
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

  const handleSelectedDay = () => {
    if (selectedCellDay.isSame(dayjs(), 'day')) {
      return todayWeather;
    }
    const firstFilterdDay = excludeTodayWeather
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

  console.log(handleSelectedDay());
  const iconCode = selectedCellDay.isSame(dayjs(), 'day')
    ? handleSelectedDay().weather[0].icon
    : handleSelectedDay()[0].weather[0].icon;

  console.log(iconCode);

  let trimedIconCode =
    iconCode.substr(0, 2) === '01' ||
    iconCode.substr(0, 2) === '02' ||
    iconCode.substr(0, 2) === '03' ||
    iconCode.substr(0, 2) === '10'
      ? iconCode
      : iconCode.substr(0, 2);
  console.log(trimedIconCode);

  const filteredIcon = weatherIcon.filter(
    (element) => element.code === trimedIconCode,
  );
  console.log(filteredIcon[0].icon);

  const selectedDayTemp = selectedCellDay.isSame(dayjs(), 'day')
    ? Math.round(handleSelectedDay().main.temp)
    : Math.round(handleSelectedDay()[0].main.temp);

  const selectedDayDescriptionId = selectedCellDay.isSame(dayjs(), 'day')
    ? handleSelectedDay().weather[0].id
    : handleSelectedDay()[0].weather[0].id;
  console.log(selectedDayDescriptionId);

  const idAssignDescription = () => {
    if (selectedDayDescriptionId >= 200 && selectedDayDescriptionId < 300) {
      return filteredThunderstormDescription[0].description;
    } else if (
      selectedDayDescriptionId >= 300 &&
      selectedDayDescriptionId < 500
    ) {
      return filteredDrizzleDescription[0].description;
    } else if (
      selectedDayDescriptionId >= 500 &&
      selectedDayDescriptionId < 600
    ) {
      const filteredDetailRainDescription = filteredRainDescription.filter(
        (element) => Number(element.id) === selectedDayDescriptionId,
      );
      return filteredDetailRainDescription[0].description;
    } else if (
      selectedDayDescriptionId >= 600 &&
      selectedDayDescriptionId < 700
    ) {
      return filteredSnowDescription[0].description;
    } else if (
      selectedDayDescriptionId >= 700 &&
      selectedDayDescriptionId < 800
    ) {
      const filteredDetailAtmosphereDescription =
        filteredAtmosphereDescription.filter(
          (element) => Number(element.id) === selectedDayDescriptionId,
        );
      return filteredDetailAtmosphereDescription[0].description;
    } else if (selectedDayDescriptionId === 800) {
      return filteredClearDescription[0].description;
    } else if (selectedDayDescriptionId > 800) {
      const filteredDetailCloudsDescription = filteredCloudsDescription.filter(
        (element) => Number(element.id) === selectedDayDescriptionId,
      );
      return filteredDetailCloudsDescription[0].description;
    }
  };

  const selectedDayDescription = idAssignDescription();
  console.log(selectedDayDescription);

  const selectedDayTempMaxArr = selectedCellDay.isSame(dayjs(), 'day')
    ? todayWeather.main.temp_max
    : excludeTodayWeather
        .filter(
          (list) =>
            list.dt_txt.substr(0, 10) ===
            weatherDate.add(1, 'day').format('YYYY-MM-DD'),
        )
        .map((data) => {
          return data.main.temp_max;
        });
  const selectedDayTempMinArr = selectedCellDay.isSame(dayjs(), 'day')
    ? todayWeather.main.temp_min
    : excludeTodayWeather
        .filter(
          (list) =>
            list.dt_txt.substr(0, 10) ===
            weatherDate.add(1, 'day').format('YYYY-MM-DD'),
        )
        .map((data) => {
          return data.main.temp_min;
        });
  console.log(selectedDayTemp);

  const selectedDayTempMax = selectedCellDay.isSame(dayjs(), 'day')
    ? Math.round(selectedDayTempMaxArr)
    : Math.round(Math.max(...selectedDayTempMaxArr));
  const selectedDayTempMin = selectedCellDay.isSame(dayjs(), 'day')
    ? Math.round(selectedDayTempMinArr)
    : Math.round(Math.min(...selectedDayTempMinArr));

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
