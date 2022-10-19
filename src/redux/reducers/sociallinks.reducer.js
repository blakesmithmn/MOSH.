import { combineReducers } from 'redux';
// separate these out into separate reducer files

const spotifyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_LINKS':
            return action.payload;
        case 'CLEAR_LINKS':
            return {};
        default:
            return state;
    }
}




export default spotifyReducer;