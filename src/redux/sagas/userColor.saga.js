import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
// FUNCTION TO FETCH EVENT DETAILS FROM AN API
// ALSO FETCHES USER STATUS FROM DB

function* fetchUserColor(action) {
    const color = action.payload;
    try {
        const getUserColor = (color) => {
            switch (color) {
                case 'pink':
                    return pink[500];
                case 'deepPurple':
                    return deepPurple[500];
                case 'indigo':
                    return indigo[500];
                case 'teal':
                    return teal[500];
                case 'green':
                    return green[500];
                case 'orange':
                    return orange[500];
                case 'lightBlue':
                    return lightBlue[500];
            }
        };


    }
    catch (error) {
        console.log('Error in API Search:', error);
    }

}

function* colorSaga() {
    yield takeLatest('FETCH_USER_COLOR', fetchUserColor);

}

export default colorSaga;
