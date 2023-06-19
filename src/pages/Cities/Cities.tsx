import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Grid } from '@mui/material';

import CityCard from '../../components/CityCard/CityCard';

import useFetchCities from '../../hooks/useFetchCities';
import { useSnackBar } from '../../contexts/useSnackbar';

import Loader from '../../components/Loader';
import { ERRORS, ROUTE_PATHS } from '../../utils/constants';

import './cities.css'

const Cities = () => {
  const { 
    isInitialLoading,
    isLoading,  
    data, 
    error, 
    hideCity,
    fetchWeatherData,
    refetchWeatherData
  } = useFetchCities()

  const { showErrorMessage  } = useSnackBar()
  const navigate = useNavigate()

  useEffect(() => {
    fetchWeatherData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isInitialLoading) {
    return <Loader/>
  }

  if (error) {
    showErrorMessage(error)
  }

  if (!data.length && (!isInitialLoading && !isLoading)) {
    showErrorMessage(ERRORS.NO_WEATHER_DATA_FOUND)
  }

  const fetchLatestData = () => {
    refetchWeatherData()
  }

  return (
    <Grid 
      container 
      className='cities-container' 
      alignItems={'center'} 
      justifyContent={'center'} 
      spacing={4} 
      sx={{ paddingTop: 4, paddingBottom: 4, paddingRight: 6, paddingLeft: 6 }}
    >
      <Grid item container spacing={2} justifyContent={'center'}>
        <Grid item>
          <Button 
            variant='contained' 
            disabled={isLoading}
            onClick={fetchLatestData}
          >
            Fetch Latest Data
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={isLoading || isInitialLoading} 
            variant='contained' 
            onClick={() => navigate(ROUTE_PATHS.HIDDEN)}>
            Hidden Cities
          </Button>
        </Grid>
      </Grid>
      {
        isLoading && <Loader/> 
      }
      <Grid item container rowSpacing={4} columnSpacing={12}>
        { 
          data.filter((item) => !item.isHidden)
          .map((cityData) => (
            <Grid key={cityData.name} item xs={6} md={4}>
              <CityCard 
                isHidden={cityData.isHidden} 
                city={cityData.name}
                picture={cityData?.picture} 
                handleClick={() => hideCity(cityData.name)} 
              />
            </Grid>
          ))
        }  
      </Grid>
    </Grid>
  )
}

export default Cities;

