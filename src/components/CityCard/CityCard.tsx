import React from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  CardMedia, 
  IconButton 
} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { CityCardProps } from '../../types';
import { ROUTE_PATHS } from '../../utils/constants';

const CityCard: React.FC<CityCardProps> = (props) => {
  const { city, isHidden, picture: displayImage, handleClick } = props;
  const navigate = useNavigate();

  return (
    <Card sx={{ alignItems: 'center', position: 'relative' }}>
      <CardContent sx={{ padding: 0 }}>
        <CardHeader
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            padding: 0.5,
            borderRadius: 2,
            backgroundColor: 'white',
            '& .MuiCardHeader-action': {
              margin: 0
            }
          }}
          action={
            <IconButton 
              aria-label="hiding" 
              onClick={() => handleClick(city)} 
              sx={{ padding: 0 }}
            >
              {isHidden ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
            </IconButton>
          }
        />
        <CardMedia
          component="img"
          height="194"
          image={displayImage}
          alt={city}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button 
          onClick={() => navigate(`${ROUTE_PATHS.CITIES}/${city}`)}
        >
          Visit {city} weather
        </Button>
      </CardActions>
    </Card>
  )
}

export default React.memo(CityCard);
