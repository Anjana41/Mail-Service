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
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavGroup,
    name: 'Contacts',
    // to: '/base',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'All Contacts',
      //   to: '/allcontacts',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Import',
      //   to: '/',
      // },
      {
        component: CNavItem,
        name: 'Create Contacts',
        to: '/create-contact',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Campaigns',
    // to: '/base',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'All campaigns',
      //   to: '/allcampaigns',
      // },
      {
        component: CNavItem,
        name: 'Create Campaign',
        to: '/campaign',
      },
      // {
      //   component: CNavItem,
      //   name: 'Email templates',
      //   to: '/templates',
      // },

    ],
  },
  {
    component: CNavGroup,
    name: 'Plan',
    // to: '/base',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Current Plan',
        to: '/currentplan',
      },
      {
        component: CNavItem,
        name: 'Transaction History',
        to: '/transaction',
      },
      // {
      //   component: CNavItem,
      //   name: 'Cancel Plan',
      //   to: '/cancelplan',
      // },

    ],
  },
  {
    component: CNavItem,
    name: 'Sign-Up Form',
    to: '/SignupForm',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  
   
 
]

export default _nav
