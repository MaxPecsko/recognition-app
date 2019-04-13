// PERFORMING CHANGES THROUGH REDUCERS
import {
    CHANGE_IMAGE_URL,
    USER_REQUEST_PENDING,
    USER_REQUEST_SUCCESS,
    USER_REQUEST_FAIL
} from './constants';

const imageInitialState = {
    imageUrl: ''
};

export const changeInput = (state=imageInitialState, action={}) => {
    switch(action.type) {
        case CHANGE_IMAGE_URL:
            return Object.assign({}, state, { imageUrl: action.payload });
        default:
            return state;
    }
}

const usersInitialState = {
    isPending: false,
    users: [],
    error: ''
};

export const requestUsers = (state=usersInitialState, action={}) => {
    switch(action.type) {
        case USER_REQUEST_PENDING:
            return Object.assign({}, state, { isPending: true });
        case USER_REQUEST_SUCCESS:
            return Object.assign({}, state, { users: action.payload, isPending: false });
        case USER_REQUEST_FAIL:
            return Object.assign({}, state, { error: action.payload, isPending: false});
        default:
            return state;
    }
};















































