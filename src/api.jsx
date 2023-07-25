import axios from 'axios';

//creating an axios instance ->
const request = axios.create({
    //v3 tak commen for all url. (ye urls documentaion se copy kar rahe hai.)
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        key: "AIzaSyCvm8-lrS360nASo0ClmOqCZJWbou3L3-I", //defined in .env file.
    }
});


export default request;
