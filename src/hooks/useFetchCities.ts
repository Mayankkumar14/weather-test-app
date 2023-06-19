import { useState } from "react";
import { LOCAL_PROXY, WEATHER_API_ENDPOINT } from "../utils/config";

import { CityData, WeatherData } from "../types";
import { 
  nameSort, 
  getFilterCitiesData, 
  getCitiesCachedData, 
  setCitiesCacheData, 
  getCityTempData, 
  setCityTempData, 
  removeCitiesCachedData
} from '../utils/helper';
import { ERRORS } from "../utils/constants";

interface InitialStates {
  isInitialLoading: boolean;
  isLoading: boolean;
  refetched: boolean;
  error: null | string;
  data: CityData[] | []
}

const INITIAL_STATES: InitialStates = {
  isInitialLoading: true,
  isLoading: false,
  refetched: false,
  data: [],
  error: null
}

const callFetchAPI = async () => {
  try {
    const response = await fetch(LOCAL_PROXY + WEATHER_API_ENDPOINT)
    
    if (!response.ok) {
      return [null]
    }
    
    const weatherData = await response.json()
    return [weatherData] as [WeatherData[]]
  } catch(error) {
    return [null]  as [null]
  }  
}

const useFetchCities = () => {
  const [citiesDataStates, setCitiesDataStates] = useState(INITIAL_STATES)

  const formatAndUpdateCitiesData = (weatherData: WeatherData[]) => {
    const citiesData: CityData[] = [];

    weatherData.forEach(item => {
      if (!citiesData.find(city => city?.name === item.city.name)) {
        citiesData.push({ ...item.city, isHidden: false })
      }
    })

    nameSort(citiesData);
    setCitiesCacheData(citiesData);
    
    setCitiesDataStates((prevStates) => ({
      ...prevStates,
      isLoading: false,
      isInitialLoading: false,
      error: null,
      data: citiesData
    }));
    
    // Updating cache  
    citiesData.forEach(city => {
      const cityName = city.name
      const cityTempData = getCityTempData(city.name)
      if (!cityTempData) {
        setCityTempData(cityName, getFilterCitiesData(weatherData, cityName))
      }
    })
  }

  const setErrorStates = (errorStates: Partial<InitialStates>) => {
    setCitiesDataStates((prevStates) => ({
      ...prevStates,
      ...errorStates,
      data: [],
    }));
  }

  const fetchWeatherData = async () => {
    setCitiesDataStates((prevStates) => ({
      ...prevStates,
      isInitialLoading: true,
      error: null
    }))

    const cachedData = getCitiesCachedData()

    if (cachedData) {
      setCitiesDataStates((prevStates) => ({
        ...prevStates,
        isInitialLoading: false,
        data: cachedData
      }))
      return 
    }

    const [weatherData] = await callFetchAPI()

    if (weatherData) {
      if (weatherData.length === 0) {
        setCitiesDataStates((prevStates) => ({
          ...prevStates,
          isInitialLoading: false,
          data: [],
          error: null
        }));

        return
      }

      formatAndUpdateCitiesData(weatherData)
      
    } else {
      setErrorStates({
        isInitialLoading: false,
        error: ERRORS.WEATHER_API_FETCHING
      })
    }
  }

  const refetchWeatherData = async () => {
    removeCitiesCachedData()

    setCitiesDataStates((prevStates) => ({
      ...prevStates,
      data: [],
      isLoading: true,
      refetched: true,
      error: null
    }))

    const [weatherData] = await callFetchAPI()

    if (weatherData) {
      if (weatherData && weatherData.length === 0) {
        setCitiesDataStates((prevStates) => ({
          ...prevStates,
          isLoading: false,
          data: [],
          error: null
        }));
        return
      }
      
      formatAndUpdateCitiesData(weatherData);
    } else {
      setErrorStates({
        isLoading: false,
        error: ERRORS.WEATHER_API_REFETCHING
      })
    }
  }

  const hideCity = (city: string) => {
    const data: CityData[] = getCitiesCachedData();
    const newCitiesData = data.map(item => {
      if (item.name === city) {
        return { ...item, isHidden: !item.isHidden };
      }
      return item;
    })
    nameSort(newCitiesData);
    setCitiesCacheData(newCitiesData);
    setCitiesDataStates((prevStates) => ({
      ...prevStates,
      data: newCitiesData 
    }))
  }

  return {
    ...citiesDataStates,
    fetchWeatherData,
    refetchWeatherData,
    hideCity
  }
}

export default useFetchCities