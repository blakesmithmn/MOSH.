
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

export default eventDetails;