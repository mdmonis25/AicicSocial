import axios from 'axios';


export default axios.create({
    baseURL: "https://guflu.in/Social_media/smedia_api.php",
    headers: {
        "Content-Type": "application/json",
    }
})
