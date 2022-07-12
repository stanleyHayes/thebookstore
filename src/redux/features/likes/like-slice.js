import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LIKE_API} from "../../../api/like";

const initialState = {
    likes: [],
    likeError: null,
    likeLoading: false,
    likeMessage: null,
    likeDetail: null,
}

export const getLikes = createAsyncThunk('likes/getLikes', async ({token, query}) => {
    try {
        const response = await LIKE_API.getLikes(token, query);
        return response.data;
    } catch (e) {
        const {message} = e.response.data;
        return message;
    }
});

export const getLike = createAsyncThunk('likes/getLike', async ({id}, {rejectWithValue}) => {
    try {
        const response = await LIKE_API.getLike(id);
        return response.data;
    } catch (e) {
        const {message} = e.response.data;
        return rejectWithValue(message);
    }
});

export const toggleLike = createAsyncThunk(
    'likes/toggleLike', async ({token, book,}, {rejectWithValue}) => {
        try {
            const response = await LIKE_API.toggleLike(token, book);
            return response.data;
        } catch (e) {
            const {message} = e.response.data;
            return rejectWithValue(message);
        }
    });

const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getLikes.pending, (state) => {
            state.likeLoading = true;
            state.likeError = null;
            state.likeMessage = null;
        }).addCase(getLikes.fulfilled, (state, action) => {
            state.likeLoading = false;
            state.likeError = null;
            state.likeMessage = action.payload.message;
            state.likes = action.payload.data;
        }).addCase(getLikes.rejected, (state, action) => {
            state.likeLoading = false;
            state.likeError = action.payload;
            state.likeMessage = action.payload;
            state.likes = [];
        }).addCase(getLike.pending, (state) => {
            state.likeLoading = true;
            state.likeError = null;
            state.likeMessage = null;
        }).addCase(getLike.fulfilled, (state, action) => {
            state.likeLoading = false;
            state.likeError = null;
            state.likeMessage = action.payload.message;
            state.likeDetail = action.payload.data;
        }).addCase(getLike.rejected, (state, action) => {
            state.likeLoading = false;
            state.likeError = action.payload;
            state.likeDetail = null;
        }).addCase(toggleLike.pending, (state) => {
            state.likeLoading = true;
            state.likeError = null;
            state.likeMessage = null;
        }).addCase(toggleLike.fulfilled, (state, action) => {
            state.likeLoading = false;
            state.likeError = null;
            state.likeMessage = action.payload.message;
            state.likes = [...state.likes, action.payload.data];
        }).addCase(toggleLike.rejected, (state, action) => {
            state.likeLoading = false;
            state.likeError = action.payload;
        })
    }
});

export const selectLike = state => state.likes;

export const LIKES_ACTION_CREATORS = {getLikes, getLike, toggleLike, ...likeSlice.actions};
export default likeSlice.reducer;
