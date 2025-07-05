import React from "react";
import axios from "axios";

//import for frontend css
import { Button, Table, Row, Col, Modal, Form } from "react-bootstrap";

class HomeScreen extends React.Component {
  state = {
    details: [],
    showModal: false,
    formData: {
      id: null,
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      department: "",
    },
  };

  componentDidMount() {
    this.fetchEmployees(); // Fetch employees when the component mounts
  }

  fetchEmployees = () => {
    axios
      .get("http://localhost:8000/employees/")
      .then((response) => {
        this.setState({ details: response.data }); // Store fetched employees in state
      })
      .catch((error) => {
        console.error("There was an error fetching the employee data!", error);
      });
  };

  handleEdit = (employee) => {
    this.setState({
      showModal: true,
      formData: { ...employee }, // Set the form data to the employee being edited
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value }, // Update form data as user types
    }));
  };

  handleCreate = () => {
    this.setState({
      showModal: true, // Show the modal for creating a new employee
      formData: {
        id: null, // Reset form data for new employee
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        department: "",
      },
    });
  };

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:8000/employees/${id}/`)
        .then(() => {
          this.fetchEmployees(); // Refresh the employee list after deletion
        })
        .catch((error) => {
          console.error("There was an error deleting the employee!", error);
        });
    }
  };

  handleSubmit = () => {
    const { formData } = this.state;

    if (formData.id) {
      // If id exists, update the employee
      axios
        .put(`http://localhost:8000/employees/${formData.id}/`, formData)
        .then(() => {
          this.fetchEmployees(); // Refresh the employee list
          this.setState({ showModal: false }); // Close the modal
        })
        .catch((err) =>
          console.error("There was an error updating the employee!", err)
        );
    } else {
      axios
        .post("http://localhost:8000/employees/", formData)
        .then(() => {
          this.fetchEmployees(); // Refresh the employee list
          this.setState({ showModal: false }); // Close the modal
        })
        .catch((err) =>
          console.error("There was an error creating the employee!", err)
        );
    }
  };

  render() {
    const { details, showModal, formData } = this.state;
    return (
      <div>
        <h2>Bangladesh Submarine Cables PLC</h2>
        <hr />
        <Button variant="success" onClick={this.handleCreate} className="mb-3">
          + Add Employee
        </Button>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail) => (
                  <tr key={detail.id}>
                    <td>{detail.first_name} </td>
                    <td>{detail.last_name}</td>
                    <td>{detail.phone_number}</td>
                    <td>{detail.email}</td>
                    <td>{detail.department}</td>
                    <td>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => this.handleEdit(detail)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => this.handleDelete(detail.id)}
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
        {/* Modal used for Edit/create */}
        <Modal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>{formData.id ? "Edit" : "Add"} Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {[
                "first_name",
                "last_name",
                "phone_number",
                "email",
                "department",
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ showModal: false })}
            >
              Close
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

export default HomeScreen;
