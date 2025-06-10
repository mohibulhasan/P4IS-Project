//import logo from './logo.svg';
//import './App.css';

import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = { details: [], };

  componentDidMount() {

    axios.get('http://localhost:8000/employees/')
      .then(response => {
        this.setState({ details: response.data }); // Store fetched employees in state
      })
      .catch(error => {
        console.error("There was an error fetching the employee data!", error);
      })
    }
  render() {
    return (
      <div>
        <h1>Bangladesh Submarine Cables PLC</h1>
        <hr />
        <ul>
          {this.state.details.map((detail, index) => (
            <li key={index}>
              <h2>{detail.first_name} {detail.last_name}</h2>
              <p>Phone: {detail.phone_number}</p>
              <p>Email: {detail.email}</p>
              <p>Department: {detail.department}</p>
            </li>
          ))}
        </ul>
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