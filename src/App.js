import React from 'react';

function App() {
  return (
    <div>
      <h1>Property Maintenance PWA</h1>
      <p>Connected to backend at: {process.env.REACT_APP_API_URL}</p>
    </div>
  );
}

export default App;
