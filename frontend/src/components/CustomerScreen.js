import React from "react";
import axios from "axios";
import { Button, Table, Row, Col, Modal, Form } from "react-bootstrap";

class CustomerScreen extends React.Component {
  state = {
    customers: [],
    locations: [],
    showModal: false,
    formData: {
      id: null,
      first_name: "",
      last_name: "",
      organization: "",
      email: "",
      phone: "",
      location: "",
      customer_type: "",
    },
  };

  componentDidMount() {
    this.fetchCustomers();
    this.fetchLocations();
  }

  fetchCustomers = () => {
    axios
      .get("http://localhost:8000/customers/")
      .then((response) => {
        this.setState({ customers: response.data });
      })
      .catch((error) => {
        console.error("Error fetching customers!", error);
      });
  };

  fetchLocations = () => {
    axios
      .get("http://localhost:8000/locations/")
      .then((res) => this.setState({ locations: res.data }))
      .catch((err) => console.error("Error fetching locations!", err));
  };

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://localhost:8000/customers/${id}/`)
        .then(() => {
          this.fetchCustomers();
        })
        .catch((error) => {
          console.error("Delete failed!", error);
        });
    }
  };

  handleEdit = (customer) => {
    this.setState({
      showModal: true,
      formData: {
        ...customer,
        location: customer.location?.id || "",
      },
    });
  };

  handleCreate = () => {
    this.setState({
      showModal: true,
      formData: {
        id: null,
        first_name: "",
        last_name: "",
        organization: "",
        email: "",
        phone: "",
        location: "",
        customer_type: "",
      },
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      formData: {
        ...prev.formData,
        [name]: name === "location" ? parseInt(value) : value,
      },
    }));
  };

  handleSubmit = () => {
    const { formData } = this.state;
    const payload = {
      ...formData,
      location: parseInt(formData.location),
    };

    const url = formData.id
      ? `http://localhost:8000/customers/${formData.id}/`
      : "http://localhost:8000/customers/";

    const method = formData.id ? axios.put : axios.post;

    method(url, payload)
      .then(() => {
        this.setState({ showModal: false });
        this.fetchCustomers();
      })
      .catch((err) => console.error("Save failed!", err));
  };

  render() {
    const { customers, showModal, formData, locations } = this.state;

    return (
      <div className="p-4">
        <h2>Customer Management</h2>
        <hr />
        <Button variant="success" onClick={this.handleCreate} className="mb-3">
          + Add Customer
        </Button>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Organization</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((cust) => (
                  <tr key={cust.id}>
                    <td>{cust.first_name}</td>
                    <td>{cust.last_name}</td>
                    <td>{cust.organization}</td>
                    <td>{cust.email}</td>
                    <td>{cust.phone}</td>
                    <td>{cust.customer_type}</td>
                    <td>{cust.location?.location_name || "N/A"}</td>
                    <td>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="me-2"
                        onClick={() => this.handleEdit(cust)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => this.handleDelete(cust.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {formData.id ? "Edit Customer" : "Add Customer"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {[
                "first_name",
                "last_name",
                "organization",
                "email",
                "phone",
              ].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>
                    {field.replace("_", " ").toUpperCase()}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name={field}
                    value={formData[field] || ""}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              ))}

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Select
                  name="location"
                  value={formData.location || ""}
                  onChange={this.handleChange}
                >
                  <option value="">-- Select Location --</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.location_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Customer Type</Form.Label>
                <Form.Select
                  name="customer_type"
                  value={formData.customer_type || ""}
                  onChange={this.handleChange}
                >
                  <option value="">-- Select Type --</option>
                  <option value="IIG">IIG</option>
                  <option value="ISP">ISP</option>
                  <option value="NIX">NIX</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showModal: false })}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              {formData.id ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CustomerScreen;
