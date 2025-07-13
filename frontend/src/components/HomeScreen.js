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
  Spinner,
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
    searchTerm: "", // for searching with text
    selectLocationFilter: "", // for filtering by location
    loadingCustomers: false, // to show loading for customers
    customerError: null,
  };

  clockInterval = null;

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
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  fetchCustomers = () => {
    this.setState({ loadingCustomers: true, customerError: null });
    // Query for customers from the backend
    const params = new URLSearchParams();
    if (this.state.searchTerm) {
      params.append("search", this.state.searchTerm);
    }
    if (this.state.selectLocationFilter) {
      params.append("location_id", this.state.selectLocationFilter);
    }
    axios
      .get(`http://localhost:8000/customers/${params.toString()}`)
      .then((res) =>
        this.setState({ customerData: res.data, loadingCustomers: false })
      )
      .catch((err) => {
        console.error("Error fetching customer data:", err);
        this.setState({
          customerError: "Failed to load customer data",
          loadingCustomers: false,
        });
      });
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

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleLocationFilterChange = (e) => {
    this.setState({ selectLocationFilter: e.target.value });
  };

  render() {
    const {
      customerData,
      locationData,
      newLocationName,
      currentTime,
      date,
      searchTerm,
      selectedLocationFilter,
      loadingCustomers,
      customerError,
    } = this.state;

    return (
      <Container className="mt-4">
        <Row>
          {/* Left Column */}
          <Col lg={8}>
            <Row className="mb-4">
              <Col md={6} lg={4} sm={12}>
                <Card className="box-shadow">
                  <Card.Header>Network Device Details</Card.Header>
                  <Card.Body>
                    <Button
                      variant="primary"
                      className="ms-2"
                      onClick={() => alert("This is out of scope for now")}
                    >
                      Submit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={4} sm={12}>
                <Card className="box-shadow">
                  <Card.Header>Interface Details</Card.Header>
                  <Card.Body>
                    <Button
                      variant="primary"
                      className="ms-2"
                      onClick={() => alert("This is out of scope for now")}
                    >
                      Submit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={4} sm={12}>
                <Card className="box-shadow">
                  <Card.Header>Goto Ticketing System</Card.Header>
                  <Card.Body>
                    <Button
                      variant="primary"
                      className="ms-2"
                      onClick={() => alert("This is out of scope for now")}
                    >
                      Submit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card className="mb-4">
              <Card.Header className="bg-success text-white">
                <h5>Select a Network Device</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="d-flex mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Write your query here"
                    // value={newLocationName}
                    // onChange={(e) =>
                    //   this.setState({ newLocationName: e.target.value })
                    // }
                  />
                  <Button
                    variant="primary"
                    className="ms-2"
                    onClick={() => alert("This is out of scope for now")}
                  >
                    Submit
                  </Button>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header className="bg-success text-white">
                <h5>Search Customers</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="d-flex mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Search customers (name, email, etc.)" // Updated placeholder
                    value={searchTerm} // Bind to searchTerm state
                    onChange={this.handleSearchChange} // new handler
                  />
                  <Button
                    variant="primary"
                    className="ms-2"
                    // No need for a separate submit button, search is debounced
                    onClick={() => this.fetchCustomers()}
                  >
                    Search
                  </Button>
                </Form.Group>
                {/* New: Location Filter Dropdown */}
                <Form.Group className="mt-3">
                  <Form.Label>Filter by Location:</Form.Label>
                  <Form.Select
                    value={selectedLocationFilter}
                    onChange={this.handleLocationFilterChange}
                  >
                    <option value="">All Locations</option>
                    {locationData.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.location_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Header>
                <h5>
                  <i className="fas fa-chart-pie me-2"></i>
                  Customer Details
                </h5>
              </Card.Header>
              <Card.Body>
                {loadingCustomers ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : customerError ? (
                  <div className="text-danger">{customerError}</div>
                ) : (
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
                            {locationData.find(
                              (loc) => loc.id === cust.location
                            )?.location_name || "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
          {/* Right Column */}
          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header className="bg-success text-white">
                <h5>
                  <i className="fas fa-map-marker-alt me-2"></i>
                  PoP Locations
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
