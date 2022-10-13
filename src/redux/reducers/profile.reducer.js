import { combineReducers } from 'redux';


// USER OBJECT LOOKS LIKE
//     about_me:null
//     admin:false
//     first_name:"Blake"
//     id:6
//     inserted_at:"2022-10-12T20:30:06.949Z"
//     last_name:"Smith"
//     profile_picture:null
//     updated_at:"2022-10-12T20:30:06.949Z"
//     username:"blakesmithmn"
//     zipcode:"55416"

const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROFILE_TO_EDIT':
            return action.payload;
        case 'EDIT_FIRST_NAME':
            return { ...state, first_name: action.payload };
        case 'EDIT_LAST_NAME':
            return { ...state, last_name: action.payload };
        case 'EDIT_ABOUT_ME':
            return { ...state, about_me: action.payload };
        case 'EDIT_ZIPCODE':
            return { ...state, zipcode: action.payload };
        default:
            return state;
    }
};


export default profileReducer;
