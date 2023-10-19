import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    // filters: [],
    // activeFilter: 'all',
}


const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroesFetching: state => { state.heroesLoadingStatus = 'loading' },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => { state.heroesLoadingStatus = 'error' },

    }
})

export default heroesSlice.reducer;
export const { heroesFetching, heroesFetched, heroesFetchingError } = heroesSlice.actions;


// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
//     // filters: [],
//     // activeFilter: 'all',
// }

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         // case 'FILTERS_FORM':
//         //     return {
//         //         ...state,
//         //         filters: action.filters
//         //     }
//         // case 'ACTIVE_FILTER':
//         //     return {
//         //         ...state,
//         //         activeFilter: action.payload
//         //     }
//         default: return state
//     }
// }

// export default heroes;