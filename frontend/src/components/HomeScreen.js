import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import "../bootstrap.min.css";
import Calendar from "react-calendar";

const HomeScreen = () => {
  const [customerData, setCustomerData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:8000/customers/")
      .then((res) => setCustomerData(res.data))
      .catch((err) => console.error("Error fetching customer data:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        {/* Left Column */}
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5>
                <i className="fas fa-chart-pie me-2"></i>
                Customer Properties
              </h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover size="sm">
                <thead className="table-success">
                  <tr>
                    <th>Customer Name</th>
                    <th>AS Number</th>
                    <th>Peering IP</th>
                    <th>Location</th>
                    <th className="text-center">Bandwidth</th>
                    <th className="text-center">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((cp, index) => (
                    <tr key={index}>
                      <td>
                        {cp.first_name} {cp.last_name}
                      </td>
                      <td>{cp.ASN || "-"}</td>
                      <td>{cp.peering_IP || "-"}</td>
                      <td>{cp.customer_location || "-"}</td>
                      <td className="text-end">
                        {cp.customer_Bandwidth} {cp.customer_unit}
                      </td>
                      <td className="text-center">{cp.customer_type}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="primary" size="sm" href="/add-customer">
                Add Customer
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column */}
        <Col lg={4}>
          <Card bg="primary" text="white" className="mb-4">
            <Card.Header>
              <i className="fas fa-tachometer-alt me-2"></i>
              Clock
            </Card.Header>
            <Card.Body className="text-center">
              <h2>{currentTime.toLocaleTimeString()}</h2>
            </Card.Body>
          </Card>

          <Card className="shadow">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">
                <i className="far fa-calendar-alt me-2"></i>Calendar
              </h5>
            </Card.Header>
            <Card.Body>
              <Calendar onChange={setDate} value={date} className="w-100" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
