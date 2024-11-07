import axios from "axios";

// Create an instance of Axios with custom configuration
const apiClient = axios.create({
  // baseURL: "https://creativecoders.azurewebsites.net", // Replace with your API base URL
  baseURL: "http://localhost:8000/", // Replace with your API base URL
  timeout: 5000, // Set the request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Set the default content type
  },
});

// Export the API client instance
export default apiClient;
