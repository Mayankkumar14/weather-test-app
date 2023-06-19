export interface CityBasicInfo {
  picture: string;
  isHidden ?: boolean;
}

export interface CityData extends CityBasicInfo {
  name: string;
}

export interface TempData {
  tempType: string;
  temp: number;
  date: Date | string;
}

export interface WeatherData extends TempData {
  city: CityData;
}

export interface CityTempCustomData extends CityBasicInfo {
  data: TempData[] | []
} 

export interface CityCardProps extends CityBasicInfo {
  city: string;
  handleClick: (city: string) => void;
}
