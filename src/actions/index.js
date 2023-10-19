import { createAction } from "@reduxjs/toolkit"


export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersInForm = (filters) => {
    return {
        type: 'FILTERS_FORM',
        filters: filters
    }
}

export const activeFilter = (filter) => {
    return {
        type: 'ACTIVE_FILTER',
        payload: filter
    }
}