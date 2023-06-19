import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Typography, Button } from '@mui/material';

import CityCard from '../../components/CityCard/CityCard';
import { CityData } from '../../types';

import { getCitiesCachedData, onHideClick } from '../../utils/helper';
import { ERRORS, ROUTE_PATHS } from '../../utils/constants';

const HiddenCities = () => {
  const [data, setData] = useState<CityData[]>();
  const citiesCachedData = getCitiesCachedData();
  const navigate = useNavigate();

  useEffect(() => {
    if (citiesCachedData && citiesCachedData.length) {
      const hiddenCities = citiesCachedData.filter((city: any) => city.isHidden); 
      setData(hiddenCities); 
    }
  }, [citiesCachedData])

  return (
    <Grid
      container
      alignItems={'center'}
      textAlign={'center'}
      spacing={2}
      justifyContent={'center'}
      sx={{ paddingTop: 2, paddingRight: 6, paddingLeft: 6 }}
    >
      <Grid item>
        <Typography variant='h3'>
          Hidden Cities
        </Typography>
      </Grid>
      <Grid 
        item 
        container 
        spacing={2} 
        justifyContent={'center'}
      >
        <Grid item>
          <Button 
            variant='contained' 
            onClick={() => {
              navigate(ROUTE_PATHS.CITIES);
            }}
          >
            All Cities
          </Button>
        </Grid>
      </Grid>
      <Grid 
        item 
        container 
        spacing={2} 
        rowSpacing={4} 
        columnSpacing={12} 
        justifyContent={'center'}
      >
        {data && data.length > 0 ? data.map((item) => (
          <Grid key={item.name} item xs={6} md={4} >
            <CityCard
              isHidden={item.isHidden}
              city={item.name}
              picture={item.picture}
              handleClick={() => onHideClick(item.name)}
            />
          </Grid>
        )) : (
          <Grid item>
            <Typography variant='h5'>
              {ERRORS.NO_HIDDEN_CITIES_FOUND}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid >
  )
}

export default HiddenCities;
