import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// FUNCTION THAT TAKES API DATA AND ADDS IT TO THE DB

// NEEDS CONDITIONAL RENDERING SO USERS CANNOT ADD THE SAME EVENT TWICE
function* addEvent(action) {
    let userID = action.payload.userID;
    let eventID = action.payload.id;
    try {
        // POSTS TO EVENTS.ROUTER
        const newEvent = yield axios({
            method: 'POST',
            url: '/api/events',
            data: action.payload
        })
        console.log(action.payload);

        // HERE IS WHERE I AM HAVING ISSUES CURRENTLY
        // THIS INFO COMES FROM EVENTS.ROUTER
        // NEEDS TO GRAB EVENT STATUS AGAIN ... 
        // TRIED RUNNING FETCH DETAILS WITH NO LUCK
        // FETCH DETAILS LIVES IN SEARCH SAGA

        yield put({
            type: 'SAGA_FETCH_DETAILS',
            payload: eventID
        })
    }
    catch (error) {
        console.log('ERROR in POST new EVENT:', error);
    }
}

function* fetchUserEvents(action) {
    try {
        const userevents = yield axios({
            method: 'GET',
            url: `/api/events/${action.payload}`,
        })
        yield put({
            type: 'SET_USER_EVENTS',
            payload: userevents.data
        })
    }
    catch (error) {
        console.log('ERROR in GET USER EVENTS:', error);
    }
}

function* deleteUserEvent(action) {
    const userID = action.payload.userID
    const concertID = action.payload.concertID
    const params = { userID, concertID };
    try {
        const eventDelete = yield axios({
            method: 'DELETE',
            url: `/api/events/${userID}`,
            params: params
        })
        yield put({
            type: 'FETCH_USER'
        })
    } catch (error) {
        console.log('ERROR IN DELETE SAGA', error);
    }
}





function* eventSaga() {
    yield takeLatest('SAGA_ADD_EVENT', addEvent);
    yield takeLatest('SAGA_FETCH_USER_EVENTS', fetchUserEvents);
    yield takeLatest('SAGA_DELETE_EVENT', deleteUserEvent)
}

export default eventSaga;