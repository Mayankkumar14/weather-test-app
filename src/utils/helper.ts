import { WeatherData } from '../types';
import { CityData, CityTempCustomData } from '../types';

import { CITIES_CACHE_KEY } from './constants';

export const nameSort = (weatherData: {
  name: string;
}[]) => {
  weatherData.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    } else if (b.name > a.name) {
      return -1;
    }
    return 0;
  });
};

export const getISTDate = (date: string | Date) => {
  return (new Date(date)).toString().replace('GMT+0530 (India Standard Time)', '')
}

export const onHideClick = (city: string) => {
  const data: CityData[] = getCitiesCachedData();
  const newCitiesData = data.map(item => {
    if (item.name === city) {
      return { ...item, isHidden: !item.isHidden };
    }
    return item;
  })
  nameSort(newCitiesData);
  setCitiesCacheData(newCitiesData);
}

export const isHiddenCitiesAvailable = () => {
  const data: CityData[] = getCitiesCachedData();
  return data.find(element => element.isHidden === true);
}

export const getFilterCitiesData = (weatherData: WeatherData[], city: string): CityTempCustomData => {
  const filterCityData = weatherData.filter(item => item.city.name === city);
  let cityTemperatureObject: CityTempCustomData = {
    picture: filterCityData[0].city.picture,
    isHidden: false,
    data: []
  };
  filterCityData.forEach(item => {
    cityTemperatureObject = { ...cityTemperatureObject, data: [...cityTemperatureObject.data, { temp: item.temp, tempType: item.tempType, date: item.date }] }
  })
  cityTemperatureObject = {
    ...cityTemperatureObject, data: cityTemperatureObject.data.sort((a: any, b: any) => {
      return Date.parse(a.date) - Date.parse(b.date)
    })
  }
  return cityTemperatureObject;
}

export const getTemperature = (type: string, value: number) => {
  switch (type) {
    case 'K':
      return (value - 273.15).toFixed(2);
    case 'F':
      return (((value - 32) * 5) / 9).toFixed(2);
    default:
      return value;
  }
}

export const getCitiesCachedData = () => {
  const citiesCacheData = localStorage.getItem(CITIES_CACHE_KEY)
  return citiesCacheData ? JSON.parse(citiesCacheData) : null
}

export const setCitiesCacheData = (citiesData: CityData[]) => {
  localStorage.setItem(CITIES_CACHE_KEY, JSON.stringify(citiesData))
}

export const getCityTempData = (cityName: string) => {
  const cityData = localStorage.getItem(cityName)
  return cityData ? JSON.parse(cityData) : null
}

export const setCityTempData = (cityName: string, data : CityTempCustomData) => {
  localStorage.setItem(cityName, JSON.stringify(data))
}

export const removeCitiesCachedData = () => {
  localStorage.removeItem(CITIES_CACHE_KEY)
}
