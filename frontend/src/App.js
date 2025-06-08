//import logo from './logo.svg';
//import './App.css';

import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = { details: [], };

  componentDidMount() {

    let data;
    axios.get('http://localhost:8000')
      .then(response => {
        data = response.data;
        this.setState({ details: data });
      })
      .catch(error => { })
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