import React from 'react';
import './App.css';
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
      <footer className="footer">
        <p>© {new Date().getFullYear()} All rights reserved to <a href="https://www.linkedin.com/in/harshit-patle" target="_blank" rel="noopener noreferrer">Harshit Patle</a>.</p>
      </footer>

    </div>
  );
}

export default App;
