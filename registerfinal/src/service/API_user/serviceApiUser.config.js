import axios from "axios";

/* const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${""}`,
}; */

export const APIuser = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  /*  headers: APIHeaders, */
  timeout: 600000,
});
