import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    bookmarkedJobs: JSON.parse(localStorage.getItem("bookmarkedJobs")) || [],
};

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        deleteJobFromStore: (state, action) => {
            state.allAdminJobs = state.allAdminJobs.filter(
                (job) => job._id !== action.payload
            );
        },

        // ✅ Toggle bookmark function
        toggleBookmark: (state, action) => {
            const jobId = action.payload;
            const isBookmarked = state.bookmarkedJobs.some((job) => job._id === jobId);

            if (isBookmarked) {
                state.bookmarkedJobs = state.bookmarkedJobs.filter((job) => job._id !== jobId);
            } else {
                const jobToBookmark = state.allJobs.find((job) => job._id === jobId);
                if (jobToBookmark) {
                    state.bookmarkedJobs.push(jobToBookmark);
                }
            }

            // ✅ Save to localStorage
            localStorage.setItem("bookmarkedJobs", JSON.stringify(state.bookmarkedJobs));
        },
    },
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    deleteJobFromStore,
    toggleBookmark,
} = jobSlice.actions;

export default jobSlice.reducer;
