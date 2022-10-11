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

const eventDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        case 'CLEAR_EVENT_DETAILS':
            return {};
        default:
            return state;
    }
}


export default combineReducers({
    searchResults,
    eventDetails,
});