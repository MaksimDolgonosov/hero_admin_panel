import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import ReduxThunk from 'redux-thunk';
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


const store = createStore(reducer, compose(applyMiddleware(ReduxThunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
//
export default store;