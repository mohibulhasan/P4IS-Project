import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/HomeScreen";
import CustomerScreen from "./components/CustomerScreen";
import IPTransit from "./components/services/ip-transit";
import IPLC from "./components/services/iplc";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <Container>
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/employees" element={<HomeScreen />} />
            <Route path="/customers" element={<CustomerScreen />} />
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
