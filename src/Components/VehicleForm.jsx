import React, { useState } from 'react';
import './vehicleform.css';

const VehicleForm = () => {
    const [formData, setFormData] = useState({
        vehicleModel: '',
        vehicleAge: '',
        mileage: '',
        symptoms: '',
    });

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const googleApiKey = import.meta.env.VITE_API_KEY;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const formatResponseText = (text) => {
        return text.split('* **').map((part, index) => {
            if (index === 0) return part; 
            const [title, ...rest] = part.split(':');
            return (
                <p key={index}>
                    <strong>{title.trim()}</strong>:{rest.join(':').trim()}
                </p>
            );
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null); 

        const requestData = {
            contents: [
                {
                    parts: [
                        {
                            text: `
            I am trying to predict maintenance issues for a vehicle based on the following details:
            - Vehicle Model: ${formData.vehicleModel}
            - Vehicle Age: ${formData.vehicleAge} years
            - Mileage: ${formData.mileage} km
            - Symptoms: ${formData.symptoms}
    
            Based on this data, please predict the maintenance duration and specific parts that may require maintenance.
          `,
                        },
                    ],
                },
            ],
        };

        fetch(`${googleApiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data?.candidates && data.candidates.length > 0) {
                    setResponse(data.candidates[0]?.content.parts[0]?.text || "No response available");
                } else {
                    setResponse("No predictions available. Please check the input or try again later.");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setResponse("An error occurred while fetching the response.");
                setLoading(false);
            });
    };

    return (
        <div className="vehicle-form-container">
            <form onSubmit={handleSubmit}>
                <h1>Vehicle Details</h1>
                <div className="form-group">
                    <label htmlFor="vehicleModel">Vehicle Model:</label>
                    <input
                        type="text"
                        id="vehicleModel"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleAge">Vehicle Age (years):</label>
                    <input
                        type="number"
                        id="vehicleAge"
                        name="vehicleAge"
                        value={formData.vehicleAge}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mileage">Mileage (in km):</label>
                    <input
                        type="number"
                        id="mileage"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="symptoms">Symptoms (comma separated):</label>
                    <input
                        type="text"
                        id="symptoms"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
            {loading && <div className="loading-spinner"></div>}
            {response && (
                <div className="response-card">
                    <h3>Prediction Result:</h3>
                    <div>{formatResponseText(response)}</div>
                </div>
            )}
        </div>
    );
};

export default VehicleForm;