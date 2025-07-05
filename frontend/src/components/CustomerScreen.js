import React from "react";
import axios from "axios";
import { Button, Table, Row, Col, Modal, Form } from "react-bootstrap";

class CustomerScreen extends React.Component {
  state = {
    customers: [],
    showModal: false,
    formData: {
      id: null,
      first_name: "",
      last_name: "",
      organization: "",
      email: "",
      phone: "",
      customer_type: "",
    },
  };

  componentDidMount() {
    this.fetchCustomers();
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
      formData: { ...customer },
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
        customer_type: "",
      },
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      formData: { ...prev.formData, [name]: value },
    }));
  };

  handleSubmit = () => {
    const { formData } = this.state;

    if (formData.id) {
      axios
        .put(`http://localhost:8000/customers/${formData.id}/`, formData)
        .then(() => {
          this.setState({ showModal: false });
          this.fetchCustomers();
        })
        .catch((err) => console.error("Update failed!", err));
    } else {
      axios
        .post(`http://localhost:8000/customers/`, formData)
        .then(() => {
          this.setState({ showModal: false });
          this.fetchCustomers();
        })
        .catch((err) => console.error("Create failed!", err));
    }
  };

  render() {
    const { customers, showModal, formData } = this.state;

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

        {/* Modal for Create/Update */}
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
                    value={formData[field]}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              ))}
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
