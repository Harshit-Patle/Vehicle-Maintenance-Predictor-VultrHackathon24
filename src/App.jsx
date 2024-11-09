import React from 'react';
import './app.css';
import VehicleForm from './Components/VehicleForm';

function App() {
  return (
    <div className="page-container">
      <header className="header">
        <img src="./image.png" height={100} />
        <h1>AI-Powered Vehicle Maintenance Predictor</h1>
      </header>
      <main className="main-content">
        <VehicleForm />
      </main>
    </div>
  );
}

export default App;
