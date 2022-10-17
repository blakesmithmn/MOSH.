import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* checkAPIEvents(action) {
    const search = action.payload.search;
    const zipcode = action.payload.zipcode;

    try {
        console.log('SEARCH IS:', search);
        console.log('ZIPCODE IS:', zipcode);
        const params = { search: search, zipcode: zipcode }
        const searchRes = yield axios({
            method: 'GET',
            url: `/api/search/${search}`,
            params: params

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





function* searchSaga() {
    yield takeEvery('SAGA_SEARCH_EVENTS', checkAPIEvents);
}

export default searchSaga;