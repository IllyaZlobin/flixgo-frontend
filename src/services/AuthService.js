import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "https://flixgo-backend.herokuapp.com/auth/login",
      {
        email,
        password,
      }
    );
    return response;
  } catch (err) {
    const { data } = err.response;
    alert(data.errors[0].message); // show error from response
  }
};
