import { useLocation } from "react-router-dom";
import React, { useState } from "react";

import {
  CButton,
  // CCard,
  // CCardBody,
  // CCardFooter,
  // CCardGroup,
  // CCardHeader,
  // CCardImage,
  // CCardLink,
  // CCardSubtitle,
  // CCardText,
  // CCardTitle,
  // CListGroup,
  // CListGroupItem,
  // CNav,
  // CNavItem,
  // CNavLink,
  // CContainer,

  // CCol,
  // CRow,
  CFormCheck,
} from "@coreui/react";


const TestB = () => {
    const [user, setUser] = useState({
        user_id: "",
       
      });
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const dataSubmit = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
    setChecked(!checked);
    return dataSubmit();
  };

  let value,name;

  const location = useLocation();
  const handleInputs = (e) => {

    
    name = "user_id";
    value =location.state.data[0]._id;
    console.log(location.state.data[1][0].p_name);
    setUser({ ...user, [name]: value });
    console.log(user);
  };
  
  const handleClick = e => {
    value = e.target.value;
    console.log(value);
    handleInputs();
    console.log('function 2:');
  };

  return (
    <>
      <div>{location.state.data._id}</div>
      <CFormCheck id="flexCheckDefault" label="Default checkbox" onClick={onCheckboxClick}/>

      <CButton
        color="secondary"
        size="sm"
        value={"Free"}
        disabled={isDisabled}
        // onClick={handleInputs}
        onClick={handleClick}
      >
        {/* value={user.name} */}
        SignUp Free
      </CButton>

     
    </>
  );

  }
export default TestB;
