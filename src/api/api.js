import axios from "axios";

const BASE_URL = "https://localhost:7182"; // Reemplaza con la URL base de tu API

export const login = async (userName, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/security/createToken`,
      {
        userName,
        password,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173/",
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    throw new Error("Authentication failed");
  }
};

export const getPeople = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/People/Get`, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:5173/",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Failed to fetch people");
    }
  } catch (error) {
    throw new Error("Failed to fetch people");
  }
};
