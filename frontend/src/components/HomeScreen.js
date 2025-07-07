import React from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import Calendar from "react-calendar";
import "../bootstrap.min.css";

class HomeScreen extends React.Component {
  state = {
    customerData: [],
    locationData: [],
    newLocationName: "",
    currentTime: new Date(),
    date: new Date(),
  };

  componentDidMount() {
    this.fetchCustomers();
    this.fetchLocations();
    this.clockInterval = setInterval(
      () => this.setState({ currentTime: new Date() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.clockInterval);
  }

  fetchCustomers = () => {
    axios
      .get("http://localhost:8000/customers/")
      .then((res) => this.setState({ customerData: res.data }))
      .catch((err) => console.error("Error fetching customer data:", err));
  };

  fetchLocations = () => {
    axios
      .get("http://localhost:8000/locations/")
      .then((res) => this.setState({ locationData: res.data }))
      .catch((err) => console.error("Error fetching locations:", err));
  };

  handleLocationAdd = () => {
    const { newLocationName } = this.state;
    if (!newLocationName.trim()) return;

    axios
      .post("http://localhost:8000/locations/", {
        location_name: newLocationName,
      })
      .then(() => {
        this.setState({ newLocationName: "" });
        this.fetchLocations();
      })
      .catch((err) => console.error("Error adding location:", err));
  };

  render() {
    const { customerData, locationData, newLocationName, currentTime, date } =
      this.state;

    return (
      <Container className="mt-4">
        <Row>
          {/* Left Column */}
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5>
                  <i className="fas fa-chart-pie me-2"></i>
                  Customer Details
                </h5>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover size="sm">
                  <thead className="table-success">
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Organization</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Type</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerData.map((cust) => (
                      <tr key={cust.id}>
                        <td>{cust.first_name}</td>
                        <td>{cust.last_name}</td>
                        <td>{cust.organization}</td>
                        <td>{cust.email}</td>
                        <td>{cust.phone}</td>
                        <td>{cust.customer_type}</td>
                        <td>
                          {cust.location ? cust.location.location_name : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Location Management
                </h5>
              </Card.Header>
              <Card.Body>
                <ul>
                  {locationData.map((loc) => (
                    <li key={loc.id}>{loc.location_name}</li>
                  ))}
                </ul>
                <Form.Group className="d-flex mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Add new location"
                    value={newLocationName}
                    onChange={(e) =>
                      this.setState({ newLocationName: e.target.value })
                    }
                  />
                  <Button
                    variant="primary"
                    className="ms-2"
                    onClick={this.handleLocationAdd}
                  >
                    Add
                  </Button>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column */}
          <Col lg={4}>
            <Card bg="primary" text="white" className="mb-4">
              <Card.Header className="bg-success text-white">
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
                <Calendar
                  onChange={(date) => this.setState({ date })}
                  value={date}
                  className="w-100"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomeScreen;
