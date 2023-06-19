import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Typography, Grid, Box, Button } from '@mui/material'

import WeatherCard from '../../components/WeatherCard/WeatherCard'
import { CityTempCustomData } from '../../types'

import { getCityTempData } from '../../utils/helper'
import { ROUTE_PATHS } from '../../utils/constants'

const CityWeatherInformation = () => {
  const { city = '' } = useParams();
  const navigate = useNavigate();

  const [weatherInformation, setWeatherInformation] = useState<CityTempCustomData>();

  useEffect(() => {
    const cachedCityTempData = getCityTempData(city);
    setWeatherInformation(cachedCityTempData || '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={
      {
        backgroundImage: `url(${weatherInformation?.picture})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
      }
    }>
      <Typography 
        variant='h1' 
        sx={{ marginTop: 4,marginBottom: 4, color: 'white' }}
      >
        {city}
      </Typography>
      <Grid 
        container 
        columnGap={8} 
        rowGap={4} 
        justifyContent='center' 
        sx={{ margin: 0, padding: 0 }}
      >
        <Grid item container justifyContent='center' >
          <Button 
            variant='contained' 
            onClick={() => {
              navigate(ROUTE_PATHS.CITIES);
            }}
          >
            All Cities
          </Button>
        </Grid>
        {
          weatherInformation?.data 
          && weatherInformation?.data.length >= 1  
          && weatherInformation.data.map(weather => (
          <Grid item sx={{ padding: 0 }} key={weather.date.toString()}>
            <WeatherCard {...weather} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CityWeatherInformation;
