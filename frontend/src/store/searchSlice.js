import {createSlice} from '@reduxjs/toolkit'

const searchState = {
    query : "",
}

const searchSlice = createSlice({
    name : "search",
    initialState : searchState,
    reducers : {
        setSearchQuery : (state,action) => {
            state.query = action.payload;
        } 
    }
})

export const {setSearchQuery} = searchSlice.actions;

export default searchSlice.reducer; 