import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addEvent(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/events',
            data: action.payload
        })
        // yield put({
        //     type: 'FETCH_'
        // })
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







function* eventSaga() {
    yield takeLatest('SAGA_ADD_EVENT', addEvent);
    yield takeLatest('SAGA_FETCH_USER_EVENTS', fetchUserEvents);
}

export default eventSaga;