import React from "react";
import axios from "axios";

//import for frontend css
import { Button, Table, Row, Col } from "react-bootstrap";

class HomeScreen extends React.Component {
  state = { details: [] };

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
    return (
      <div>
        <h2>Bangladesh Submarine Cables PLC</h2>
        <hr />
        <Row>
          <Col sm={12} md={6} lg={4} xl={3}>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>

                {this.state.details.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.first_name} </td>
                    <td>{detail.last_name}</td>
                    <td>{detail.phone_number}</td>
                    <td>{detail.email}</td>
                    <td>{detail.department}</td>
                    <td>
                      <Button variant="outline-info">Edit</Button>
                      <Button variant="outline-danger">Delete</Button>
                    </td>
                  </tr>
                ))}
              </thead>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomeScreen;
