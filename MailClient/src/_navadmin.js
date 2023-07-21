import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Admin',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavGroup,
    name: 'Customers',
    // to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      { 
        component: CNavItem,
        name: 'All Customers',
        to: '/admin/allusers',
      },
      // {
      //   component: CNavItem,
      //   name: 'User',
      //   to: '/admin/',
      // },
    ],
  },

  {
    component: CNavGroup,
    name: 'Orders',
    // to: '/',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Orders',
        to: '/admin/All-Orders',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Plans',
    // to: '/admin/subscription',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Plans',
        to: '/admin/allplans',
      },
      {
        component: CNavItem,
        name: 'Create Plan',
        to: '/admin/addplan',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Lists',
    // to: '/admin/subscription',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Lists',
        to: '/admin/userlists',
      },
      
      
    ],
  },
 
]

export default _nav
