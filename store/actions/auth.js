import {AsyncStorage} from 'react-native'

export const AUTHENTICATE = "AUTHENTICATE"
export const LOGOUT       = "LOGOUT"


let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            userId,
            token
        })
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeuLD--7oE5JGnn-ehjfrtwlGlw7fpB-M', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong!";
            switch (errorId) {
                case "EMAIL_EXISTS":
                    message = "This email exists already!"
                    break
                case "TOO_MANY_ATTEMPTS_TRY_LATER":
                    message = "We have blocked all requests from this device due to unusual activity. Try again later.!"
                    break;
            }
            throw new Error(message);
        }
        const resData = await response.json();
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeuLD--7oE5JGnn-ehjfrtwlGlw7fpB-M', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong!";
            switch (errorId) {
                case "EMAIL_NOT_FOUND":
                    message = "This email could not be found"
                    break;
                case "INVALID_PASSWORD":
                    message = "This password is not valid!"
                    break;
                case "USER_DISABLED":
                    message = "The user account has been disabled by an administrator!";
                    break;
            }
            throw new Error(message);
        }
        const resData = await response.json();
        console.log(resData)
        dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn) * 1000))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return {type: LOGOUT}
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime)
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expirationDate: expirationDate.toISOString()
    }));
}