import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
// FUNCTION TO FETCH EVENT DETAILS FROM AN API
// ALSO FETCHES USER STATUS FROM DB

function* fetchEventDetails(action) {
    const eventID = action.payload;

    console.log('FETCH EVENT ID IS:', eventID);
    try {
        const detailsRes = yield axios({
            method: 'GET',
            url: `/api/details/${eventID}`
        })
        yield put({
            type: 'SET_DETAILS',
            payload: detailsRes.data
        })
        yield put({
            type: 'SAGA_FETCH_SPOTIFY',
            payload: detailsRes.data.performers[0].name
        })

    }
    catch (error) {
        console.log('Error in API Search:', error);
    }

}

function* fetchSpotify(action) {
    const artist = action.payload
    console.log('ARTIST TO FETCH IS', action.payload)
    try {
        const spotifyRes = yield axios({
            method: 'GET',
            url: `/api/spotify/${artist}`
        })
        console.log(spotifyRes);
        // yield put({
        //     type: 'SET_DETAILS',
        //     payload: detailsRes.data
        // })
        // yield put({
        //     type: 'SAGA_FETCH_SPOTIFY',
        //     payload: detailsRes.data.performers[0].name
        // })

    }
    catch (error) {
        console.log('Error in API Search:', error);
    }

}

function* detailsSaga() {
    yield takeLatest('SAGA_FETCH_DETAILS', fetchEventDetails);
    yield takeLatest('SAGA_FETCH_SPOTIFY', fetchSpotify);

}

export default detailsSaga;
