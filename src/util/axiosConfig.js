import axios from 'axios'
import {BASE_URL} from "./apiEndpoints.js";

export const axiosConfig =  axios.create({
    baseURL : BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

//list of endpoints that do not require authorization header
const excludeEndpoints = ["/login", "/register", "/status", "/health", "/activate"];

//request interceptor
axiosConfig.interceptors.request.use(config => {
    const shouldSkipToken = excludeEndpoints.some(endpoint => config.url?.includes(endpoint));
    if(!shouldSkipToken){
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

//response interceptor
axiosConfig.interceptors.response.use(response => {
    return response;
}, (error) => {
    if(error.response) {
        if(error.response.status === 401){ //- If the user is unauthorized (token expired or invalid), redirect to login
            window.location.href = "/login";
        }
        else if(error.response.status === 500){ // Internal Server Error - - Logs a message for internal server errors
            console.error("Server Error: Please try again later." + error.response.statusText);
        }
        else if(error.code === "ECONNABORTED"){ //- Handles timeout errors (e.g., network latency or server delay)
            console.error("Request timeout: Please Try Again. " + error.response.statusText);
        }
    }
    return Promise.reject(error); //- Rejects the error so it can be handled by individual .catch() blocks if needed
})


//____________________________________________________ N O T E S ____________________________________________________
// - some(...): checks if the current request URL matches any of those substrings

/*
------------Response Interceptor-----------------------
Intercepts every incoming HTTP response to:
- Handle errors globally
- Redirect or log based on status codes
____________________________________________________
axiosConfig.interceptors.response.use(response => {
  return response;

- If the response is successful, it simply returns it unchanged
_______________________________________________________________
}, (error) => {
  if (error.response) {}

- Checks if the error has a response object (i.e., server responded with an error code)
_______________________________________________________________


 */