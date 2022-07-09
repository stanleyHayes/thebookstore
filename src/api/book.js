import axios from "axios";
import {CONSTANTS} from "../utils/constants";


const getBooks = (token, query) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/books?query=${query}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const BOOK_API = {getBooks};