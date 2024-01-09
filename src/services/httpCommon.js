import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT || 'http://localhost:5050', 
})