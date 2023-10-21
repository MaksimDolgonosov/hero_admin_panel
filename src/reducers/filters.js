import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook"

const initialState = {
    filters: [],
    activeFilter: 'all',
}

export const filterHeroes = createAsyncThunk(
    "filters/fetchFilters",
    () => {
        const { request } = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filtersInForm: (state, action) => { state.filters = action.payload },
        activeFilter: (state, action) => { state.activeFilter = action.payload },

    },
    extraReducers: (builder) => {
        builder
            .addCase(filterHeroes.fulfilled, (state, action) => { state.filters = action.payload.slice(1) })
            .addCase(filterHeroes.rejected, (state) => { state.filters = "no filter data" })
    }
})
export default filtersSlice.reducer;
export const { filtersInForm, activeFilter } = filtersSlice.actions;
// const initialState = {

//     filters: [],
//     activeFilter: 'all',
// }

// const filters = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTERS_FORM':
//             return {
//                 ...state,
//                 filters: action.payload
//             }
//         case 'ACTIVE_FILTER':
//             return {
//                 ...state,
//                 activeFilter: action.payload
//             }
//         default: return state
//     }
// }

// export default filters;