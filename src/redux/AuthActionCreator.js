import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actTypes from './ActionType.js';

const authSuccess = (token, userId, account_type) => {
    return {
        type: actTypes.AUTHENTICATION_SUCCESS,
        payload: {
            token: token,
            userId: userId,
            account_type: account_type,
        }
    }
}

const authLoading = isLoading => {
    return {
        type: actTypes.AUTHENTICATION_LOADING,
        payload: isLoading
    }
}
const errMsg = msg => {
    return {
        type: actTypes.AUTHENTICATION_FAILED,
        payload: msg
    }
}
const storeLocally = (token, email) => {
    const decoded = jwtDecode(token)
    const expirationTime = new Date(decoded.exp * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decoded.user_id);
    localStorage.setItem('exp', expirationTime);
    localStorage.setItem('email', email);
}
export const authenticate = (email, password, userMode, accType) => dispatchEvent => {
    dispatchEvent(authLoading(true));
    let authData = {
        email: email,
        password: password,
    }
    const header = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (userMode === "Login") {
        axios.post('http://127.0.0.1:8000/api/token/', authData, header)
            .then(res => {
                dispatchEvent(authLoading(false));
                const token = res.data.access;
                storeLocally(token, email)
                let account_type = "client";
                const userId = jwtDecode(token).user_id
                return axios.get(`http://127.0.0.1:8000/api/user/${userId}/`)
                    .then(res => {
                        account_type = res.data.account_type;
                        dispatchEvent(authSuccess(token, userId, account_type))
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            })
            .catch(err => {
                dispatchEvent(authLoading(false));
                console.log(err);
                const key = Object.keys(err.response.data)[0]
                dispatchEvent(errMsg(err.response.data[key]))
            })
    } else {
        authData = { ...authData, account_type: accType }
        axios.post(`http://127.0.0.1:8000/api/user/`, authData, header)
            .then(response => {
                if (response.status >= 200 && response.status <= 204) {
                    authData = {
                        email: email,
                        password: password,
                    }
                    return axios.post('http://127.0.0.1:8000/api/token/', authData, header)
                        .then(res => {
                            dispatchEvent(authLoading(false));
                            const token = res.data.access;
                            storeLocally(token, email)
                            let account_type = "client";
                            const userId = jwtDecode(token).user_id
                            return axios.get(`http://127.0.0.1:8000/api/user/${userId}/`)
                                .then(res => {
                                    account_type = res.data.account_type;
                                    dispatchEvent(authSuccess(token, userId, account_type))
                                })
                                .catch(err => {
                                    console.log(err.message);
                                })
                        })
                } else {
                    console.log("something went wrong. try again", response);
                }
            })
            .catch(error => {
                dispatchEvent(authLoading(false));
                console.log(error);
                debugger
                const key = Object.keys(error.response.data)[0]
                dispatchEvent(errMsg(error.response.data[key][0]))
            })
    }
}

export const userLogout = () => {
    return {
        type: actTypes.AUTHENTICATION_LOGOUT,
    }
}


export const authLocalCheck = () => dispatchEvent => {
    const token = localStorage.getItem('token');
    if (token === null) {
        dispatchEvent(userLogout());
    } else {
        const expirationTime = new Date(localStorage.getItem('exp'))
        if (!expirationTime || expirationTime <= new Date()) {
            dispatchEvent(userLogout());
        } else {
            const userId = localStorage.getItem('userId')
            let account_type = "client";
            axios.get(`http://127.0.0.1:8000/api/user/${userId}/`)
                .then(res => {
                    account_type = res.data.account_type;
                    dispatchEvent(authSuccess(token, userId, account_type))
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    }
}