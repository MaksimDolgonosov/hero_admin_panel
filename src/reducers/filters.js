import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    filters: [],
    activeFilter: 'all',
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filtersInForm: (state, action) => { state.filters = action.payload },
        activeFilter: (state, action) => { state.activeFilter = action.payload },

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