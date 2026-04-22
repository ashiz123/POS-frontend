// export async function createOrder(data) {
//   await
// }

export async function createOrder(data) {
  const API_URL = "http://localhost:3000/api/order/create";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem('terminal-token')}`, // Use a real token
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoidGVybWluYWwiLCJzdWIiOiI2OWJhYjllZjg1MzZkMzgwNWE1MzMyZTIiLCJlbWFpbCI6InRoYWt1cmlhc2hpekBnbWFpbC5jb20iLCJidXNpbmVzc0lkIjoiNjk4ZGIyNDEwMTY4M2FiNGJiNjE5NmNlIiwicm9sZSI6ImNhc2hpZXIiLCJ0ZXJtaW5hbElkIjoiNjliYWJhNmRmMzU1YzU2ZTQ2YzdkZDU1IiwidGVybWluYWxTZXNzaW9uSWQiOiI2OWM0MjBmNjFiODkxMjQ3MGFiNDJlNWUiLCJpYXQiOjE3NzQ0NjExNzQsImlzcyI6Im15LXBvcy1hdXRoIiwiYXVkIjoibXktcG9zLWFwaSIsImV4cCI6MTc3NDQ2MTc3NH0.juos6ccskkjQC_UC2pF4I4TMRqeJ2PmhZyNVUJFOVDU",
      },
      body: JSON.stringify(data),
    });

    // 1. Check if the response is actually successful (status 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create order");
    }

    // 2. Parse and return the Payment Intent data
    return await response.json();
  } catch (error: any) {
    // 3. Log it and re-throw so your React component can show an alert
    console.error("API Error:", error.message);
    throw error;
  }
}
