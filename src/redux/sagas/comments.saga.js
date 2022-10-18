import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addComment(action) {
    let eventID = action.payload;
    try {
        const newComment = yield axios({
            method: 'POST',
            url: '/api/comments',
            data: action.payload
        })
        yield put({
            type: 'SAGA_FETCH_COMMENTS',
            payload: newComment.data.event_id
        })
    }
    catch (error) {
        console.log('ERROR in POST new COMMENT:', error);
    }
}

function* fetchComments(action) {
    try {
        const userComments = yield axios({
            method: 'GET',
            url: `/api/comments/${action.payload}`,
        })
        yield put({
            type: 'SET_COMMENTS',
            payload: userComments.data
        })
    }
    catch (error) {
        console.log('ERROR in GET USER COMMENTS:', error);
    }
}

// function* deleteUserComment(action) {
//     const userID = action.payload.userID
//     const concertID = action.payload.concertID
//     const params = { userID, concertID };
//     try {
//         const eventDelete = yield axios({
//             method: 'DELETE',
//             url: `/api/comments/${userID}`,
//             params: params
//         })
//         yield put({
//             type: 'FETCH_USER'
//         })
//     } catch (error) {
//         console.log('ERROR IN DELETE SAGA', error);
//     }
// }





function* commentsSaga() {
    yield takeLatest('SAGA_ADD_COMMENT', addComment);
    yield takeLatest('SAGA_FETCH_COMMENTS', fetchComments);
    // yield takeLatest('SAGA_DELETE_EVENT', deleteUserEvent)
}

export default commentsSaga;