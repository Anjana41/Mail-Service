import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CSmartTable } from "@coreui/react-pro";
import Pagination from 'react-bootstrap/Pagination'
import axios from "axios";
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
  CPaginationItem,
  CPagination,
} from "@coreui/react";

const AllLists = () => {
  const [Users, setUser] = useState([]);
  const [List, setList] = useState([]);

  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  useEffect(
    () => {
      const fetchData = async () => {
        const { data } = await axios("/admin/list");
        console.log("data", data);
        setUser(data);
      };

      fetchData();
    },
    [setList],
    [setUser]
  );
  var count = 1;

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User List</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            {/* <DocsExample href="components/table#captions"> */}
            <CTable caption="top">
              {/* <CTableCaption>List of users</CTableCaption> */}
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">User</CTableHeaderCell>
                  <CTableHeaderCell scope="col">List Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Users.map((item, index) => (
                  <CTableRow data-index={index}>
                    <CTableHeaderCell scope="row">{count++}</CTableHeaderCell>
                    <CTableDataCell>{item.userdetails[0].name}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/admin/${item._id}`} activeClassName="active">
                        {item.listname}
                      </Link>
                    </CTableDataCell>

                    <CTableDataCell>{item.date}</CTableDataCell>
                  </CTableRow>
                ))}
                <CPagination aria-label="Page navigation example">
                  <CPaginationItem>Previous</CPaginationItem>
                  <CPaginationItem>1</CPaginationItem>
                  <CPaginationItem>2</CPaginationItem>
                  <CPaginationItem>3</CPaginationItem>
                  <CPaginationItem>Next</CPaginationItem>
                </CPagination>
              </CTableBody>
            </CTable>
            {/* </DocsExample> */}
          </CCardBody>
          {/* <div> */}
          <Pagination
            activePage={2}
            itemsCountPerPage={2}
            totalItemsCount={2}
            pageRangeDisplayed={2}
          // onChange={handlePageChange}
          />
          {/* </div> */}
        </CCard>
      </CCol>
    </CRow>

  );
};

export default AllLists;
