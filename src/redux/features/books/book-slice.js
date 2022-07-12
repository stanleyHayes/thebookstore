import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {BOOK_API} from "../../../api/book";
import {LIKES_ACTION_CREATORS} from "../likes/like-slice";
import {COMMENTS_ACTION_CREATORS} from "../comments/comment-slice";

const initialState = {
    books: [],
    bookError: null,
    bookLoading: false,
    bookMessage: null,
    bookDetail: null,
}

export const getBooks = createAsyncThunk('books/getBooks', async ({token, query}) => {
    try {
        const response = await BOOK_API.getBooks(token, query);
        return response.data;
    } catch (e) {
        const {message} = e.response.data;
        return message;
    }
});

export const getBook = createAsyncThunk('books/getBook', async ({id}, {rejectWithValue}) => {
    try {
        const response = await BOOK_API.getBook(id);
        return response.data;
    } catch (e) {
        const {message} = e.response.data;
        return rejectWithValue(message);
    }
});

export const createBook = createAsyncThunk(
    'books/createBook',
    async ({
               token, book, setSubmitting,
               resetForm,
               navigate,
               setBase64Trailer,
               setBase64Cover,
               setCoverPreview,
               setTrailerPreview,
               showMessage
           }, {rejectWithValue}) => {
        try {
            setSubmitting(true);
            const response = await BOOK_API.createBook(token, book);
            resetForm();
            setSubmitting(false);
            navigate('/books');
            setBase64Trailer(undefined);
            setBase64Cover(undefined);
            setCoverPreview(undefined);
            setTrailerPreview(undefined);
            showMessage(response.data.message, {variant: 'success'});
            return response.data;
        } catch (e) {
            const {message} = e.response.data;
            return rejectWithValue(message);
        }
    });


export const updateBook = createAsyncThunk('books/updateBook', async ({token, book, id}, {rejectWithValue}) => {
    try {
        const response = await BOOK_API.updateBook(token, id, book);
        return response.data;
    } catch (e) {
        const {message} = e.response.data;
        return rejectWithValue(message);
    }
});


export const deleteBook = createAsyncThunk('books/deleteBook', async ({token, id}, {rejectWithValue}) => {
    try {
        const response = await BOOK_API.deleteBook(token, id);
        return response.data;
    } catch (e) {
        const {message} = e.response.data;
        return rejectWithValue(message);
    }
});

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
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
        }).addCase(getBook.pending, (state) => {
            state.bookLoading = true;
            state.bookError = null;
            state.bookMessage = null;
        }).addCase(getBook.fulfilled, (state, action) => {
            state.bookLoading = false;
            state.bookError = null;
            state.bookMessage = action.payload.message;
            state.bookDetail = action.payload.data;
        }).addCase(getBook.rejected, (state, action) => {
            state.bookLoading = false;
            state.bookError = action.payload;
            state.bookDetail = null;
        }).addCase(deleteBook.pending, (state) => {
            state.bookLoading = true;
            state.bookError = null;
            state.bookMessage = null;
        }).addCase(deleteBook.fulfilled, (state, action) => {
            state.bookLoading = false;
            state.bookError = null;
            state.bookMessage = action.payload.message;
            state.books = state.books.filter(book => book._id !== action.payload.data._id);
        }).addCase(deleteBook.rejected, (state, action) => {
            state.bookLoading = false;
            state.bookError = action.payload;
        }).addCase(updateBook.pending, (state) => {
            state.bookLoading = true;
            state.bookError = null;
            state.bookMessage = null;
        }).addCase(updateBook.fulfilled, (state, action) => {
            state.bookLoading = false;
            state.bookError = null;
            state.bookMessage = action.payload.message;
            state.books = state.books.map(book => {
                if (book._id === action.payload.data) return action.payload.data;
                return book;
            });
        }).addCase(updateBook.rejected, (state, action) => {
            state.bookLoading = false;
            state.bookError = action.payload;
        }).addCase(createBook.pending, (state) => {
            state.bookLoading = true;
            state.bookError = null;
            state.bookMessage = null;
        }).addCase(createBook.fulfilled, (state, action) => {
            state.bookLoading = false;
            state.bookError = null;
            state.bookMessage = action.payload.message;
            state.books = [...state.books, action.payload.data];
            switch (action.payload.data.category) {
                case 'other':
                    state.otherBooks = [...state.otherBooks, action.payload.data];
                    break;
                case 'action':
                    state.actionBooks = [...state.actionBooks, action.payload.data];
                    break;
                case 'adventure':
                    state.adventureBooks = [...state.adventureBooks, action.payload.data];
                    break;
                case 'classic':
                    state.classicBooks = [...state.classicBooks, action.payload.data];
                    break;
                case 'comic':
                    state.comicBooks = [...state.comicBooks, action.payload.data];
                    break;
                case 'fantasy':
                    state.fantasyBooks = [...state.fantasyBooks, action.payload.data];
                    break;
                case 'horror':
                    state.horrorBooks = [...state.horrorBooks, action.payload.data];
                    break;
                case 'romance':
                    state.romanceBooks = [...state.romanceBooks, action.payload.data];
                    break;
                case 'sci-fi':
                    state.sciFiBooks = [...state.sciFiBooks, action.payload.data];
                    break;
                case 'crime':
                    state.crimeBooks = [...state.crimeBooks, action.payload.data];
                    break;
                case 'drama':
                    state.dramaBooks = [...state.dramaBooks, action.payload.data];
                    break;
                case 'fairytale':
                    state.fairytaleBooks = [...state.fairytaleBooks, action.payload.data];
                    break;
                default:
                    break;
            }
        }).addCase(createBook.rejected, (state, action) => {
            state.bookLoading = false;
            state.bookError = action.payload;
        }).addCase(COMMENTS_ACTION_CREATORS.createComment.fulfilled, (state, action) => {
            console.log(state)
            state.books = state.books.map(book => {
                console.log(book._id === action.payload.data.book)
                if (book._id === action.payload.data.book) {
                    console.log(book.comments.length, 'before')
                    book.comments = [...book.comments, action.payload.data];
                    console.log('comment added', book._id, action.payload.data._id)
                    console.log(book.comments.length, 'after')
                    return book;
                }
                return book;
            });

            console.log(action.payload.data)
        }).addCase(COMMENTS_ACTION_CREATORS.updateComment.fulfilled, (state, action) => {
            state.books = state.books.map(book => {
                if (book._id === action.payload.data.book) {
                    book.comments = book.comments.map(comment => {
                        if (comment._id === action.payload.data._id) {
                            return action.payload.data
                        }
                        return comment;
                    })
                    return book;
                }
                return book;
            })
        }).addCase(COMMENTS_ACTION_CREATORS.deleteComment.fulfilled, (state, action) => {
            state.books = state.books.map(book => {
                if (book._id === action.payload.data.book) {
                    book.comments = book.comments.filter(comment => comment._id !== action.payload.data._id)
                    return book;
                }
                return book;
            })
        }).addCase(LIKES_ACTION_CREATORS.toggleLike.fulfilled, (state, action) => {
            console.log(current(state.books[0].likes))
            state.books = current(state).books.map(book => {
                if (book._id === action.payload.data.book) {
                    const like = book.likes.find(like => like._id === action.payload.data._id);
                    if (like) {
                        book.likes = book.likes.filter(like => like._id !== action.payload.data._id);
                    } else {
                        book.likes.push(action.payload.data._id);
                    }
                }
                return book;
            })
        })
    }
});

export const selectBook = state => state.books;
export const selectBooksByCategory = (books, category) => {
    return books.filter(book => book.category === category);
}
export const BOOKS_ACTION_CREATORS = {getBooks, getBook, createBook, deleteBook, updateBook, ...bookSlice.actions};
export default bookSlice.reducer;
