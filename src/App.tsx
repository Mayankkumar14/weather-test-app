import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home/Home';
import CityWeatherInformation from './pages/CityTWeatherInformaton/CityWeatherInformation';
import Cities from './pages/Cities/Cities';
import HiddenCities from './pages/HiddenCities/HiddenCities';

import Header from './components/Header';
import { ROUTE_PATHS } from './utils/constants';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route path='*' element={<Home />} />
            <Route path={ROUTE_PATHS.CITIES} element={<Cities />} />
            <Route path={ROUTE_PATHS.CITY_WEATHER} element={<CityWeatherInformation />} />
            <Route path={ROUTE_PATHS.HIDDEN} element={< HiddenCities />} /> 
            <Route path='/' element={<Navigate to={ROUTE_PATHS.CITIES} />}/> 
          </Route>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
