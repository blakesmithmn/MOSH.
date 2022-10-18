import { combineReducers } from 'redux';
// separate these out into separate reducer files
const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return action.payload;
        default:
            return state;
    }
}




export default searchResults;