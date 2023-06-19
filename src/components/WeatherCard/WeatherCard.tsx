import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

import { TempData } from '../../types'
import { getISTDate, getTemperature } from '../../utils/helper'

const WeatherCard: React.FC<TempData> = (props) => {
  const { date, tempType, temp } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant='body1'>
          <strong>Date:</strong> {getISTDate(date)}
        </Typography>
        <Typography variant='body1'>
          <strong>Temparture: </strong> 
          {tempType !== 'C' ? getTemperature(tempType, temp) : Number(temp)} &deg;C
        </Typography>
      </CardContent>
    </Card>
  )
}

export default React.memo(WeatherCard);
