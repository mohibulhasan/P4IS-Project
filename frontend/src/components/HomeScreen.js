import React from "react";
import axios from "axios";

//import for frontend css
import { Button, Table, Row, Col } from "react-bootstrap";

class HomeScreen extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/employees/")
      .then((response) => {
        this.setState({ details: response.data }); // Store fetched employees in state
      })
      .catch((error) => {
        console.error("There was an error fetching the employee data!", error);
      });
  }

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
      </div>
    );
  }
}

export default HomeScreen;
