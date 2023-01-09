import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`;

const register = (body) => axios.post(`${baseUrl}/register`, body);

const login = (body) => axios.post(`${baseUrl}/login`, body);

const logout = () => axios.post(`${baseUrl}/logout`);

const forgotPassword = (body) => axios.post(`${baseUrl}/forgot-password`, body);

const resetPassword = (body) => axios.patch(`${baseUrl}/reset-password`, body);

const authApi = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};

export default authApi;
