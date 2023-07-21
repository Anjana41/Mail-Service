import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";
import { DocsCallout, DocsExample } from "src/components";
// import AllCon from "./Untitled-1";

const AllCon = () => {
  const [userData, setUserData] = useState();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const user = await res.json();
      console.log(user);
      setUserData(user._id);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
const [contactData, setData] = useState();
fetch("/contactdata") //1
  .then((response) => response.json()) //2
  .then((user) => {
    setData(user); //3
  });
  console.log(contactData);

  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Contacts</strong> <small></small>
            <CButton
              color="secondary"
              size="sm"
              name="button"
              // style={float-right}
              href="/addcontact"
            >
              Add Contact
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* <DocsExample href="components/table#captions"> */}
            <CTable caption="top">
              {/* <CTableCaption>List of users</CTableCaption> */}
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                  <CTableHeaderCell scope="col">view</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody></CTableBody>
            </CTable>
            {/* </DocsExample> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AllCon;
