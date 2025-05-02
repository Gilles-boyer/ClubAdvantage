import axios from 'axios';


 let client = axios.create({
    baseURL: "http://localhost:5174/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

export default client;