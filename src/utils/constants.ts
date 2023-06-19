export const ERRORS = {
  WEATHER_API_FETCHING: 'Error while fetching the weathers data.',
  WEATHER_API_REFETCHING: 'Error while refetching the weathers data.',
  NO_WEATHER_DATA_FOUND: 'No Weather Data Found!!',
  NO_HIDDEN_CITIES_FOUND: 'No Hidden Cities Found!!',
  OFFLINE: 'You\'re Offline!!',
  USE_NETWORK_CONTEXT: 'useNetwork must be used within an NetworkProvider',
  USE_SNACKBAR_CONTEXT: 'useSnackBar must be used within an SnackBarProvider',
  OFFLINE_TEXT: 'No network is detected. You are seeing the offline cache data!!'
}

export const SUCCESS = {
  ONLINE: 'Great! You\'re Online.'
}

export const ROUTE_PATHS = {
  CITIES: '/cities',
  CITY_WEATHER: '/cities/:city',
  HIDDEN: '/cities/hidden'
}

export const CITIES_CACHE_KEY = 'CITIES'
