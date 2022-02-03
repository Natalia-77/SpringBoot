import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/animals",
  headers: {
    "Content-type": "application/json"
  }
});