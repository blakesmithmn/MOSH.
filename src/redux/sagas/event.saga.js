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







function* eventSaga() {
    yield takeLatest('SAGA_ADD_EVENT', addEvent);
}

export default eventSaga;