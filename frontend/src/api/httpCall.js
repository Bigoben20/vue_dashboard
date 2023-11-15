import axios from "axios";

export const httpCall = () => {
    let options = {
        baseURL: 'http://127.0.0.1:8000/api',
        // baseURL: 'https://dashboard.tamamliyo.com/api',
        headers: {
            'accept' : "application/json"
        }
    }

    return axios.create(options)
}