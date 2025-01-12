const API_URL = "http://172.20.10.3:5000/api"; // URL API backend Anda

// Fungsi untuk login
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

// Fungsi untuk registrasi
export const register = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

// Fungsi untuk mendapatkan profil pengguna
export const getProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Fetching profile failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
};

// Fungsi untuk CRUD Todo
export const fetchTodos = async (token) => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Fetching todos failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    throw error;
  }
};

export const createTodo = async (token, title, description) => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error(`Creating todo failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating todo:", error.message);
    throw error;
  }
};

export const updateTodo = async (token, id, title, description) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error(`Updating todo failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating todo:", error.message);
    throw error;
  }
};

export const deleteTodo = async (token, id) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Deleting todo failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    throw error;
  }
};
