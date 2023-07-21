import React from 'react';
import {useLocation} from 'react-router-dom';

const location = useLocation();

const Loginid = () => {
  return (
    <div>{location.state.name}</div>
  )
}

export default Loginid;