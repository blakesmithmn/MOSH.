import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* checkAPIEvents(action) {
    const search = action.payload;

    try {
        console.log('SEARCH IS:', search);
        const searchRes = yield axios({
            method: 'GET',
            url: `/api/search/${search}`
        })
        yield put({
            type: 'SET_SEARCH_RESULTS',
            payload: searchRes.data
        })

    }
    catch (error) {
        console.log('Error in API Search:', error);
    }

}


function* fetchEventDetails(action) {
    const eventID = action.payload;

    console.log('EVENT ID IS:', eventID);
    try {
        const detailsRes = yield axios({
            method: 'GET',
            url: `/api/details/${eventID}`
        })
        yield put({
            type: 'SET_DETAILS',
            payload: detailsRes.data[0]
        })

    }
    catch (error) {
        console.log('Error in API Search:', error);
    }

}

function* clearEventDetails() {

}


function* searchSaga() {
    yield takeEvery('SAGA_SEARCH_EVENTS', checkAPIEvents);
    yield takeEvery('SAGA_FETCH_DETAILS', fetchEventDetails);
    yield takeEvery('SAGA_CLEAR_DETAILS', clearEventDetails);
}

export default searchSaga;