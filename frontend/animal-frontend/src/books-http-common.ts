import axios from "axios";

export const urlBackend = 'http://localhost:8080/';
export default axios.create({
  baseURL: `${urlBackend}books`,
  headers: {
    "Content-type": "application/json"
  }
});