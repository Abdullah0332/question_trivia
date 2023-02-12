import axios from "axios";
import AxiosBase from "../config/AxisoBase";

export const signIn = ({ name, email, points }) => {
  return AxiosBase.post("/auth/sign-in", { name, email, points });
};

export const getLoggedInUser = (id) => {
  return AxiosBase.get(`/auth/logged-in-user/${id}`);
};

export const updatePoints = ({ id, points }) => {
  return AxiosBase.put(`/auth/update-points/${id}`, { points });
};

export const getQuestion = (body) => {
  return axios.get("https://opentdb.com/api.php?amount=1");
};
