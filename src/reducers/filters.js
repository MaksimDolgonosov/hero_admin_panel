import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook"

const filterAdapter = createEntityAdapter();
const initialState = filterAdapter.getInitialState({
    activeFilter: 'all',
    filters: []
})


// const initialState = {
//     filters: [],
//     activeFilter: 'all',
// }

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
        // filtersInForm: (state, action) => { state.filters = action.payload },
        // activeFilter: (state, action) => { state.activeFilter = action.payload },
        filtersInForm: (state, action) => { filterAdapter.setAll(state, action.payload) },
        activeFilter: (state, action) => { state.activeFilter = action.payload },

    },
    extraReducers: (builder) => {
        builder
            .addCase(filterHeroes.fulfilled, (state, action) => { filterAdapter.setAll(state, action.payload.slice(1)) })
            //.addCase(filterHeroes.fulfilled, (state, action) => { state.filters = action.payload.slice(1) })
            .addCase(filterHeroes.rejected, (state) => { state.filters = "no filter data" })
    }
})

export const { selectAll } = filterAdapter.getSelectors(state => state.filters);
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