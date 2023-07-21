import React from 'react'
import {useEffect,useState } from "react";

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

} from '@coreui/react'
import{CSmartTable} from '@coreui/react-pro'
import { DocsCallout, DocsExample } from 'src/components'
let _id,email,name;
//  const res = fetch("/userdata", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         _id
       
//       }),
//     });
//     const usersData = res.json();
//     console.log(usersData );
//   const usersData =  res.json();
//   console.log(usersData);

  
const AllContacts = () => {
 
//use it inside your function component in JS file and make sure your //server 3001 is runing by using express


const [usersData, setData] = useState();
// const callAboutPage = fetch("/userdata") //1
//   .then((response) => response.json()) //2
//   .then((user) => {
//     setData(user); //3
//   });
  const callAboutPage = async () => {
    try {
      const res = await fetch("/userdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const user = await res.json();
     setData(user); 
     console.log(usersData);

   
    if (!res.status === 200) {
      const error = new Error(res.error);
      throw error;
    }
  } catch (err) {
    console.log(err);
  //   navigate("/login");
  }
  
};
useEffect(() => {
 callAboutPage();
}, [])
  return (
    <>
  {/* <CButton  color="primary" href="/addcontact" role="button">Link</CButton> */}
    <CSmartTable
      items={usersData}
      columnFilter
    //   columnSorter
      pagination
    //   tableProps={{
    //     hover: true,
    //   }}
    >
    </CSmartTable>

    </>
  )
    }
    export default AllContacts;
