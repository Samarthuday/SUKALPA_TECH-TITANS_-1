import axios from 'axios';

// Function to handle event registration
export const registerForEvent = async (eventId, numberOfPeople, firstName, lastName) => {
    try {
        const response = await axios.post('http://localhost:5001/api/registration', { eventId, numberOfPeople, firstName, lastName });
        return response.data;
    } catch (error) {
        // Check if the error has a response
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Registration failed: ${error.response.data.message || 'An error occurred on the server.'}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('Registration failed: No response from the server. Please check your network.');
        } else {
            // Something happened in setting up the request
            throw new Error(`Registration failed: ${error.message}`);
        }
    }
};

// Function to handle payment
export const makePayment = async (token, amount, email) => {
    try {
        const response = await axios.post('http://localhost:5001/api/registration/payment', { token, amount, email });
        return response.data;
    } catch (error) {
        // Check if the error has a response
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(`Payment failed: ${error.response.data.message || 'An error occurred on the server.'}`);
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('Payment failed: No response from the server. Please check your network.');
        } else {
            // Something happened in setting up the request
            throw new Error(`Payment failed: ${error.message}`);
        }
    }
};
