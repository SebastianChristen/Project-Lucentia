
const API_URL = 'http://localhost:8000';

async function fetchData(url, options = {}) {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
}

export const getAllUserData = async () => {
    return await fetchData(`users/`);
};


export const createUser = async (username) => {
  const data = { username };

  try {
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error during sign up:", error);
    throw error;
  }
};