

const userProfiles = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROFILE_TO_VIEW':
            return action.payload;
        case 'CLEAR_PROFILE_DETAILS':
            return {};
        default:
            return state;
    }
}

export default userProfiles;