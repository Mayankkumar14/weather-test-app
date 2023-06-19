import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { ROUTE_PATHS } from '../../utils/constants';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTE_PATHS.CITIES);
  }, [navigate])

  return <></>;
};

export default Home;

