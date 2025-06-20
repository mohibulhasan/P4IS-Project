import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import React from "react";
//import for frontend css
import { Container } from "react-bootstrap";

class App extends React.Component {
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
        <Header />
        <main className="py-3">
          <Container>
            <h1>Bangladesh Submarine Cables PLC</h1>
            <hr />
            <table>
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
                      <button onclick>Edit</button>
                      <button onclick>Delete</button>
                    </td>
                  </tr>
                ))}
              </thead>
            </table>
          </Container>
        </main>
        <Footer />
        {/* <ul>
          {this.state.details.map((detail, index) => (
            <li key={index}>
              <h2>
                {detail.first_name} {detail.last_name}
              </h2>
              <p>Phone: {detail.phone_number}</p>
              <p>Email: {detail.email}</p>
              <p>Department: {detail.department}</p>
            </li>
          ))}
        </ul> */}
      </div>
    );
    // function App() {
    //   return (
    //     <div className="App">
    //       <h1>Bangladesh Submarine Cables PLC</h1>
    //     </div>
    //   );
  }
}
export default App;
