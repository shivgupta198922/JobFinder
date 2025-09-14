import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

// Persist only the `user` field
const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["user"],
};

export const { setLoading, setUser } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
