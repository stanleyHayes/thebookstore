import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BOOK_API} from "../../../api/book";
import {books} from "./book-data";

const initialState = {
    books: [...books],
    bookError: null,
    bookLoading: false,
    bookMessage: null,
    bookDetail: books[0],
    filteredBooks: []
}

export const getBooks = createAsyncThunk('books/getBooks', async ({token, query}) => {
    try {
        return await BOOK_API.getBooks(token, query);
    }catch (e) {
        const {message} = e.response.data;
        return message;
    }
});

export const getBook = createAsyncThunk('books/getBook', async ({id}) => {
    try {
        return await BOOK_API.getBook(id);
    }catch (e) {
        const {message} = e.response.data;
        return message;
    }
})

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        filterBooksByCategory: (state, action) => {
            state.filteredBooks = state.books.filter(book => action.payload.includes(book.category));
        }
    },
    extraReducers: builder => {
        builder.addCase(getBooks.pending, (state) => {
            state.bookLoading = true;
            state.bookError = null;
            state.bookMessage = null;
        }).addCase(getBooks.fulfilled, (state, action) => {
            state.bookLoading = false;
            state.bookError = null;
            state.bookMessage = action.payload.message;
            state.books = action.payload.data;
        }).addCase(getBooks.rejected, (state, action) => {
            state.bookLoading = false;
            state.bookError = action.payload;
            state.bookMessage = action.payload;
            state.books = [];
        })
    }
});

export const selectBook = state => state.books;

export const BOOKS_ACTION_CREATORS = {getBooks, getBook, ...bookSlice.actions};
export default bookSlice.reducer;