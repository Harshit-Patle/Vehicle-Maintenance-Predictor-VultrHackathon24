// src/components/PredictionResult.jsx
import React from 'react';
import './predictionresult.css';

const PredictionResult = ({ response }) => {
    if (!response) return null;
    return (
        <div className="response-card">
            <h3>Prediction Result:</h3>
            <pre className="formatted-response">{response}</pre>
        </div>
    );
};

export default PredictionResult;