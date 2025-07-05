import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/HomeScreen";
import CustomerScreen from "./components/CustomerScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
//import for frontend css
//import { Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/employees" element={<HomeScreen />} />
        <Route path="/customers" element={<CustomerScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
