//import { createStore, compose, applyMiddleware } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
//import ReduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../components/api/apiSlice';
import { apiFilters } from '../components/api/apiFilters';
//import { getDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === "string") {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }
//enhancer(createStore)(reducer);

const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === "string") {
        return next({
            type: action
        })
    }
    return next(action)
}


//const store = createStore(reducer, compose(applyMiddleware(ReduxThunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const store = configureStore({
    reducer: {heroes, filters, [apiSlice.reducerPath]:apiSlice.reducer, [apiFilters.reducerPath]:apiFilters.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware, apiFilters.middleware),
    devTools: process.env.NODE_ENV !== "production"
})


export default store;