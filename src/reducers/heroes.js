import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useHttp } from "../hooks/http.hook"
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    // filters: [],
    // activeFilter: 'all',
}

export  const fetchHeroes = createAsyncThunk(
    "heroes/fetchHeroes",
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/heroes")
    }
)


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

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error' })
            .addDefaultCase(() => { })
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