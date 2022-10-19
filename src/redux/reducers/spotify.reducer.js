import { combineReducers } from 'redux';
// separate these out into separate reducer files

const spotifyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SPOTIFY':
            return action.payload;
        default:
            return state;
    }
}




export default spotifyReducer;