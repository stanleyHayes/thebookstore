import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui-slice";
import authReducer from "../features/auth/auth-slice";
import bookReducer from "../features/books/book-slice";
import categoryReducer from "../features/categories/category-slice";

import {CONSTANTS} from "../../utils/constants";


const themeVariant = localStorage.getItem(CONSTANTS.THEBOOKSTORE_THEME_VARIANT) ?
    JSON.parse(localStorage.getItem(CONSTANTS.THEBOOKSTORE_THEME_VARIANT)) : 'dark';

const viewMode = localStorage.getItem(CONSTANTS.THEBOOKSTORE_VIEW_MODE) ?
    JSON.parse(localStorage.getItem(CONSTANTS.THEBOOKSTORE_VIEW_MODE)) : 'grid';

const token = localStorage.getItem(CONSTANTS.THEBOOKSTORE_AUTH_TOKEN) ?
    JSON.parse(localStorage.getItem(CONSTANTS.THEBOOKSTORE_AUTH_TOKEN)) : null;

const authData = localStorage.getItem(CONSTANTS.THEBOOKSTORE_AUTH_DATA) ?
    JSON.parse(localStorage.getItem(CONSTANTS.THEBOOKSTORE_AUTH_DATA)) : null;


const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        books: bookReducer,
        categories: categoryReducer
    },
    preloadedState: {
        ui: {themeVariant, activePath: '/', drawerOpen: false, viewMode},
        auth: {
            token,
            authData
        }
    },
    devTools: true
});

export default store;