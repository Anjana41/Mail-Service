import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  CFormLabel,
  CDropdownToggle,
  CFormSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";

const handleSubmit = (event) => {
  event.preventDefault();
  console.log("form submitted ✅");
};
const NewCampaign = () => {
  const [LogUser, setLogUser] = useState();
  const [List, setList] = useState([]);

  const navigate = useNavigate();

  const callAboutPage = async () => {
    // window.alert("Hello campaign")
    try {
      const res = await fetch("/listuser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const user = await res.json();
      console.log(user);
      setList(user.allDetails);
      setLogUser(user.userData);
      // console.log("usrsfdata:",LogUser._id);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  const [Email, setEmail] = useState({
    emailbody: " ",
    listid: "None",
  });
  let name, value;
  const handlechange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEmail({ ...Email, [name]: value });
    console.log(Email);
  };
  // const PostList = () => {
  //   console.log(Email);
  // };
  const PostList = async (e) => {
    e.preventDefault();
    const listid = Email.listid
    const emailbody = Email.emailbody
    const userid = LogUser._id;

    // const listname = listid.listname
    console.log("Hello fetch api",listid,emailbody);
    const res = await fetch("/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listid,
        emailbody,
        userid,
      }),
    });
    const data = await res.json();
    // console.log(list);

    if (res.status === 422 || !data) {
      window.alert("Error in sending email!!");
    //   console.log("Invalid Registration!!");
    } else {
      window.alert("Email Send Successfull!!");
      // setEmail({ ...Email,emailbody: " ", listid: "None",});
      // reset(Email);
     
        //  navigate("/dashboard");
        

    //  return setTimeout(() => {
    //     PostData();
    //     }, 3000);
    // return await PostData();
    
    }
  };
  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Create Campaign</h1>
                    <div>
                      <CFormLabel >
                        Email Body{" "}
                      </CFormLabel>
                      <CFormTextarea
                        name="emailbody"
                        value={Email.emailbody}
                        placeholder="Type your mail here!!!!"
                        onChange={handlechange}
                      ></CFormTextarea>
                    </div>
                    <div className="d-grid">
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        Select Email List
                      </CFormLabel>
                      <CFormSelect
                        id="listid"
                        name="listid"
                        value={value}
                        onChange={(e) =>
                          setEmail({ ...Email, listid: e.target.value })
                        }
                      >
                        <option value=" ">None</option>
                        {List.map((item) => (
                          <option value={item._id}>
                            {item.listname}
                            {value}
                          </option>
                        ))}
                      </CFormSelect>
                    </div>
                    <CInputGroup className="mb-3">
                      <CFormInput type="hidden" name="userid" id="userid" />
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="primary" onClick={PostList}>
                        Send Email
                      </CButton>
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

export default NewCampaign;
