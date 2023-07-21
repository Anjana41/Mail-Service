import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";


import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CContainer,

  CCol,
  CRow,
  CFormCheck,
} from "@coreui/react";
import { DocsCallout, DocsExample } from "src/components";

import ReactImg from "src/assets/images/react.jpg";
// const handleSubmit = (event) => {
//   event.preventDefault();
//   console.log("form submitted ✅");
// };

  // const location = useLocation();
  {/* <div>{location.state.data._id}</div> */}
const Cards = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    plan_id: "",
    emails: "",
    user_id: "",
    eused: "",
  });
  // let name, value;
  // const handleInputs = (e) => {
  //   console.log(e);
  //   name = e.target.name;
  //   value = e.target.value;
  //   setUser({ ...user, [name]: value });
  // };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = user;
    console.log(user);
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration!!");
      console.log("Invalid Registration!!");
    } else {
      window.alert("Registration Successfull!!");
      console.log("Registration Successfull!!");
      // console.log(user);
     
            // navigate('/TestB', {state:{data}});
      navigate("/login");
    }
  };
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

  // const location = useLocation();
  const handleInputs = (e) => {
    // console.log(e);
    // name = e.target.name;
    console.log('submit form');
  };
  
  const handleClick = e => {
    value = e.target.value;
    console.log(value);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log('function 2:');
    PostData();
  };
  return (
    <CContainer>
    {/* <h1>Plan_Purchase</h1> */}
    <CRow xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
      <CCol xs>
        <CCard className="h-100">
          <CCardHeader>
            <h1>Premium</h1>
          </CCardHeader>
          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <CButton color="secondary" size="sm">
            {" "}
              Buy Now
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="h-100">
          <CCardHeader>
            {" "}
            <h1>Standard</h1>
          </CCardHeader>

          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This card has supporting text below as a natural lead-in to
              additional content.
            </CCardText>
          </CCardBody>
          <CCardFooter>
            <CButton color="secondary" size="sm">
            Buy Now
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="h-100">
          <CCardHeader>
            {" "}
            <h1>Free</h1>
          </CCardHeader>

          {/* <CCardImage orientation="top" src="/images/react.jpg" /> */}

          <CCardBody>
            <CCardTitle>Card title</CCardTitle>
            <CCardText>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </CCardText>
          </CCardBody>
          <CCardFooter>
          <CFormCheck id="flexCheckDefault" label="Default checkbox" onClick={onCheckboxClick}/>

          <Link to="/login">

          <CButton
        color="secondary"
        size="sm"
        value={"free"}
        disabled={isDisabled}
        // onClick={handleInputs}
        onClick={handleClick}
      >
        {/* value={user.name} */}
        SignUp Free
      </CButton>
            </Link>

            {/* <small className="text-medium-emphasis">
              Last updated 3 mins ago
            </small> */}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
    </CContainer>

  );
};

export default Cards;
