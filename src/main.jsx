import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios";

axios.defaults.withCredentials = true;
// const API_BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "https://mini-capstone-api-v7ht.onrender.com/products.json";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://mini-capstone-api-v7ht.onrender.com/products.json";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
