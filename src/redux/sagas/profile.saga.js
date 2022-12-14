import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchProfileToEdit(action) {
    try {
        const profileID = action.payload;
        const res = yield axios({
            method: 'GET',
            url: `/api/profiles/${profileID}`
        })
        yield put({
            type: 'SET_PROFILE_TO_EDIT',
            payload: {
                about_me: res.data.about_me,
                id: res.data.id,
                username: res.data.username,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                zipcode: res.data.zipcode,
                color: res.data.color,
            }
        })
    } catch (err) {
        console.log(err)
    }
}

function* fetchUserProfiles(action) {
    try {
        const profileID = action.payload;
        const res = yield axios({
            method: 'GET',
            url: `/api/profiles/${profileID}`
        })
        yield put({
            type: 'SET_PROFILE_TO_VIEW',
            payload: {
                about_me: res.data.about_me,
                id: res.data.id,
                username: res.data.username,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                zipcode: res.data.zipcode,
                color: res.data.color,
            }
        })
    } catch (err) {
        console.log(err)
    }
}




function* updateProfile(action) {
    try {
        const profile = action.payload;
        yield axios({
            method: 'PUT',
            url: `/api/profiles/${profile.id}`,
            data: profile
        })
        yield put({
            type: 'FETCH_USER'
        })
    } catch (error) {
        console.log('Error in updating profile', error);
    }
}

function* profileSaga() {
    yield takeLatest('FETCH_PROFILE_TO_EDIT', fetchProfileToEdit);
    yield takeLatest('UPDATE_PROFILE', updateProfile);
    yield takeLatest('FETCH_USER_PROFILE', fetchUserProfiles);
}

export default profileSaga;
