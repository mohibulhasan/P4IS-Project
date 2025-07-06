import Header from "./components/Header";
import Footer from "./components/Footer";
import EmployeeScreen from "./components/EmployeeScreen";
import CustomerScreen from "./components/CustomerScreen";
import Troubleshoot from "./components/Troubleshoot";
import IPTransit from "./components/services/ip-transit";
import IPLC from "./components/services/iplc";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { Container } from "react-bootstrap";
import HomeScreen from "./components/HomeScreen";

function App() {
  return (
    <div>
      <Container>
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/HomeScreen" element={<HomeScreen />} />
            <Route path="/employees" element={<EmployeeScreen />} />
            <Route path="/customers" element={<CustomerScreen />} />
            <Route path="/troubleshoot" element={<Troubleshoot />} />
            <Route path="/services/ip-transit" element={<IPTransit />} />
            <Route path="/services/iplc" element={<IPLC />} />
            {/* Add more routes as needed */}
          </Routes>

          <Footer />
        </Router>
      </Container>
    </div>
  );
}

export default App;
