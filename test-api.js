// Simple Node.js script to test the API endpoint
// Run with: node test-api.js

// Import the same axios instance used in the project
import axios from 'axios';

// You would need to get the actual access token from localStorage in a browser
// For this test, you'll need to replace this with a valid token from your app
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';

async function testApi() {
  try {
    console.log('Testing API endpoint...');
    
    // Create an axios instance similar to the one in the project
    const api = axios.create({
      baseURL: 'http://localhost:5180', // Adjust this to match your dev server
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Add auth interceptor like in the project
    api.interceptors.request.use(
      (config) => {
        if (ACCESS_TOKEN) {
          config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    const response = await api.get('/appointments/api/admin/requests/');
    
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Data type:', typeof response.data);
    
    if (Array.isArray(response.data)) {
      console.log('Response is an array with', response.data.length, 'items');
      if (response.data.length > 0) {
        console.log('First item keys:', Object.keys(response.data[0]));
        console.log('First item sample:', JSON.stringify(response.data[0], null, 2).substring(0, 500));
      }
    } else if (typeof response.data === 'object' && response.data !== null) {
      console.log('Response is an object');
      console.log('Response keys:', Object.keys(response.data));
      
      if (response.data.results && Array.isArray(response.data.results)) {
        console.log('Found results array with', response.data.results.length, 'items');
        if (response.data.results.length > 0) {
          console.log('First result keys:', Object.keys(response.data.results[0]));
        }
      }
      if (response.data.data && Array.isArray(response.data.data)) {
        console.log('Found data array with', response.data.data.length, 'items');
        if (response.data.data.length > 0) {
          console.log('First data item keys:', Object.keys(response.data.data[0]));
        }
      }
    } else {
      console.log('Response is of type:', typeof response.data);
      console.log('Response value:', response.data);
    }
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
  }
}

testApi();