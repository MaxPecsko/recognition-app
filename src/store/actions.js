// DECLARING ACTIONS
import {
    CHANGE_IMAGE_URL,
    USER_REQUEST_PENDING,
    USER_REQUEST_SUCCESS,
    USER_REQUEST_FAIL
} from './constants';

export const setImageUrl = (text) => ({
    type: CHANGE_IMAGE_URL,
    payload: text
})

export const requestUsers = () => (dispatch) => {
    dispatch({ type: USER_REQUEST_PENDING });
    fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(data => dispatch({ type: USER_REQUEST_SUCCESS, payload: data }))
        .catch(err => dispatch({ type: USER_REQUEST_FAIL, payload: err }));
}