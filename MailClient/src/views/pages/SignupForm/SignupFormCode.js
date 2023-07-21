import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormTextarea,
} from "@coreui/react";
import { CFormText } from "@coreui/react-pro";
const SignupFormCode = () => {
  const location = useLocation();
  const listid = location.state.list.list._id;
  const userid = location.state.userid;

  //     const value= [`<form action="http://localhost:5000/Subscribe/Email/${userid}/${listid}" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate> <div id="mc_embed_signup_scroll"> <h2>Subscribe</h2> <div class="mc-field-group"> <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span> </label> <input type="email" value="" name="email" class="required email" id="mce-EMAIL" required></input> </div> <br/> <div class="optionalParent"> <div class="clear foot"> <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></input> </div> </div> </div></form>`
  // ];

  const value = [
    `<form method="POST" action="http://localhost:3000/Subscribe/Email/${userid}/${listid}" >
    <br>
    <label>Email:<input type="text" name="email" required></label>
    <input type="submit" value="Submit">
    </form>`,
  ];

  return (
    <form method="POST">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Embedded form builder</h1>
                    <h3 class="card-title">Your form is ready!</h3>
                    <p>
                      Copy & paste this code into your website's HTML where you
                      want the form to appear.
                    </p>
                    <h6>Embedded Form Code</h6>
                    <CInputGroup className="mb-3">
                      <CFormTextarea
                        name="emailbody"
                        // value={Email.emailbody}
                        // onChange={handlechange}
                        value={value}
                      ></CFormTextarea>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="hidden"
                        // value={userData}
                        name="userid"
                        id="userid"
                      />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="primary">Create List</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </form>
  );
};

export default SignupFormCode;
