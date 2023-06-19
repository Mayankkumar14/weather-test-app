import { Outlet } from "react-router-dom";
import { useNetwork } from "../../contexts/useNetwork";

import { ERRORS } from "../../utils/constants";
import './header.css';

const Header = () => {
  const { isOnline } = useNetwork()

  return (
    <div className='header'>
      <div className='header-content'>
        {
          !isOnline &&
          <div className="offline">
            <span>
              {ERRORS.OFFLINE_TEXT}
            </span>   
          </div>  
        }
      </div>
      <div className='router-content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Header
