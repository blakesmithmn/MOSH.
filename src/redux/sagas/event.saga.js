import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addEvent(action) {
    try {
        const newEvent = yield axios({
            method: 'POST',
            url: '/api/events',
            data: action.payload
        })
        console.log(action.payload);
        yield put({
            type: 'SAGA_FETCH_DETAILS',
            payload: { eventID: action.payload.id, userID: action.payload.userID }
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