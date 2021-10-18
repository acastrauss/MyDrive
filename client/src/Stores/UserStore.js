import {createStore} from 'redux';

export const LOGIN_USER = 'LOG_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const initUser = {
    _id : null,
    Username: null,
    PasswordHash: null,
    Email: null
};

export function UserReducer(
    state = initUser, action
) {
    if(action.type === LOGIN_USER){
        return action.user;
    }
    else if(action.type === LOGOUT_USER){
        return initUser;
    }
    else {
        return state;
    }
}

export const userStore = createStore(UserReducer);