import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

function App() {
  const [inputValues, setInputValue] = useState(0);

  const requestDevice = () => {
    axios.get(`http://127.0.0.1:8000/scan/device?host=${inputValues}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  return(
    <div>
      <input type={"text"} placeholder={"1.1.1.1"} id={"inputIP"} value={inputValues} onChange={(e) => setInputValue(e.target.value)}></input>
      <button onClick={requestDevice}> CLICK ME!</button>
    </div>
  );

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
