import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

// Основной компонент
function App() {
  const cors = require('cors');

  App.use(cors())
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const handleButtonClick = async () => {
      const hostInput = document.getElementById('input-host').value;
      try {
        const response = await axios.get('http://0.0.0.0:8000/scan/device', {
          params: { host: hostInput }
        });
        setResponseData(response.data);
      } catch (error) {
        console.error('Error scanning device:', error);
      }
    };

    const button = document.getElementById('btn-scan');
    if (button) {
      button.addEventListener('click', handleButtonClick);
    }

    // Очистка при размонтировании компонента
    return () => {
      if (button) {
        button.removeEventListener('click', handleButtonClick);
      }
    };
  }, []);

  return (
    <div>
      {responseData && (
        <div>
          <h2>Результаты сканирования:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
