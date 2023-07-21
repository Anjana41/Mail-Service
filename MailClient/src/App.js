import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Plan = React.lazy(() => import('./views/pages/plan/Plan'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
// const Contacts = React.lazy(() => import('./views/pages/Audience/AllContacts'))

const TestA = React.lazy(() => import('./views/pages/TestA'))
const TestB = React.lazy(() => import('./views/pages/TestB'))

const Loginid = React.lazy(() => import('./Loginid'))
const EmailVerify = React.lazy(() => import('./views/pages/EmailVerify/index'))
const Cards = React.lazy(() => import('./views/pages/Cards/Card'))
const Payment = React.lazy(() => import('./views/pages/Payment/Payment'));
const PaymentSuccess = React.lazy(() => import('./views/pages/Payment/PaymentSuccess'));
const FreePlan = React.lazy(() => import('./views/pages/Payment/FreePlan'));
const AdminDefalut = React.lazy(() => import('./views/admin/layout/DefaultLayout'))

class App extends Component {

  // componentDidMount() {
  //   fetch(' http://localhost:3000/:id/verify/:token')
  //   .then(res => res.json())
  //   .then((data) => {
  //     this.setState({ contacts: data })
  //   })
  //   .catch(console.log)
  // }
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/plans" name="Plan" element={<Plan/>} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="*" name="Home" element={<DefaultLayout />} />
            <Route exact path="/TestA" name="TestA" element={<TestA />} />
            <Route exact path="/TestB" name="TestB" element={<TestB />} />
            <Route exact path="/:id/verify/:token" name="EmailVerify" element={<EmailVerify />} />
            <Route exact path="/cards" name="Cards" element={<Cards />} />
            <Route exact path="/payment" name="Payment" element={<Payment />} />
            <Route exact path="admin/*" name="admindashboard" element={<AdminDefalut/>} />
            <Route exact path="/payment/status" name="paymentstatus" element={<PaymentSuccess/>} />
            <Route exact path="/Free/Plan" name="freeplan" element={<FreePlan />} />

            {/* <Route exact path="/allcontacts" name="Contacts" element={<Contac />} /> */}

          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
