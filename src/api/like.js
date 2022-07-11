import axios from "axios";
import {CONSTANTS} from "../utils/constants";


const getLikes = (query) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/likes?query=${query}`,
    });
}

const toggleLike = (token, book) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/likes`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {book}
    });
}


const getLike = (id) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/likes/${id}`,
    });
}


export const LIKE_API = {getLikes, getLike, toggleLike};