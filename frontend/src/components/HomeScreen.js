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

  render() {
    const { details, showModal, formData } = this.state;
    return (
      <div>
        <h2>Bangladesh Submarine Cables PLC</h2>
        <hr />
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
            <Button variant="primary" onClick={this.HandleSubmit}>
              {formData.id ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HomeScreen;
