import "./assets/styles/app.scss"
import  Navbar  from "./assets/components/Navbar/Navbar.jsx"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider.jsx"
import Home from "./assets/components/Home/Home.jsx"
import Dashboard from "./assets/components/Dashboard/Dashboard.jsx"
import Monthly from "./assets/components/Monthly/Monthly.jsx"
import Transactions from "./assets/components/Transactions/Transactions.jsx"
import Depenses from "./assets/components/Depenses/Depenses.jsx"
import Parametres from "./assets/components/Parametres/Parametres.jsx"
import Epargnes from "./assets/components/Epargnes/Epargnes.jsx"
import Login from "./assets/components/Login/Login.jsx"
import Register from "./assets/components/Register/Register.jsx"
function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <div className="vertical-navbar-wrapper">
            <Navbar />
          </div>
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/mensuel" element={<Monthly />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/depenses" element={<Depenses />} />
              <Route path="/epargnes" element={<Epargnes />} />
              <Route path="/parametres" element={<Parametres />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
