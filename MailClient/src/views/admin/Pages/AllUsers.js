
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CSmartTable } from '@coreui/react-pro';
import axios from "axios";
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
    CCardGroup,
    CBadge,
    CCollapse
  } from "@coreui/react";


const AllUsers = () => {

    const [details, setDetails] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
      const fetchData = async () => {
        const { data } = await axios('/userdata')
        setUsers(data);
        // console.log(data);
      }
      // setTimeout(() => {
        fetchData()
      // }, 2000)
    }, [setUsers])
    const columns = [
        { key: '_id', _style: { width: '5%' }, _props: { color: 'primary', className: 'fw-semibold' },},

      {
        key: 'name',
        _style: { width: '40%' },
        _props: { color: 'primary', className: 'fw-semibold' },
      },
      {
        key: 'email',
        _style: { width: '40%' },
        _props: { color: 'primary', className: 'fw-semibold' },
      },
      { key: 'verified',  _style: { width: '20%' }, _props: { color: 'primary', className: 'fw-semibold' }, },
      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
        _props: { color: 'primary', className: 'fw-semibold' },
      },
    ]
    const getBadge = (status) => {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          return 'primary'
      }
    }
    const toggleDetails = (index) => {
      const position = details.indexOf(index)
      let newDetails = details.slice()
      if (position !== -1) {
        newDetails.splice(position, 1)
      } else {
        newDetails = [...details, index]
      }
      setDetails(newDetails)
    }
    return (
      <CSmartTable
        activePage={3}
        cleaner
        clickableRows
        columns={columns}
        columnFilter
        columnSorter
        // footer
        items={users}
        itemsPerPageSelect
        itemsPerPage={5}
        pagination
        scopedColumns={{
          status: (item) => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          show_details: (item) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item._id)
                  }}
                >
                  {details.includes(item._id) ? 'Hide' : 'Show'}
                </CButton>
              </td>
            )
          },
          details: (item) => {
            return (
              <CCollapse visible={details.includes(item._id)}>
            {/* <p className="text-muted">User ID: {item._id}</p> */}
                <CCardBody>
                <h5>User Id: {item._id}</h5>
                  <h5>User Name: {item.name}</h5>
                  <h5>User Name: {item.email}</h5>

                  {/* <h5>User Name: {item.name}</h5> */}

                  {/* <p className="text-muted">User since: {item.name}</p> */}
                  <CButton size="sm" color="info">
                    Status
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1">
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            )
          },
        }}
        // selectable 
        // sorterValue={{ column: 'name', state: 'asc' }}
        tableFilter
        tableHeadProps={{
          color: 'danger',
        }}
        tableProps={{
          striped: true,
          hover: true,
        }}
      />
    )
}
export default AllUsers;

