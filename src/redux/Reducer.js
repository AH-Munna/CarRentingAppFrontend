import * as actTypes from './ActionType.js';
import { category } from '../Components/Body/Gallery/imageData.js';

const INITIAL_STATE = {
    selectedCategory: null,
    category: category,
    email: null,
    cars: [],
    commentsLoadError: null,
    rented: null,
    rents: [],
    totalPrice: 40,
    purchase: false,
    orders: [],
    ordersLoading: true,
    ordersLoadError: false,
    auth: { token: null, userId: null, authLoading: false, authFailedMessage: null, account_type: "client" }
}

export const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actTypes.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                auth: {
                    token: action.payload.token,
                    userId: action.payload.userId,
                    authFailedMessage: null,
                    account_type: action.payload.account_type
                }
            }
        case actTypes.AUTHENTICATION_LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem('exp');
            localStorage.removeItem('email');
            // localStorage.removeItem("expirationTime");
            return {
                ...state,
                auth: {
                    token: null,
                    userId: null,
                    authFailedMessage: null,
                }
            }
        case actTypes.AUTHENTICATION_LOADING:
            return {
                ...state,
                auth: { authLoading: action.payload }
            }
        case actTypes.AUTHENTICATION_FAILED:
            return {
                ...state,
                auth: { authFailedMessage: action.payload }
            }
        case actTypes.CATEGORY_SELECT:
            return {
                ...state,
                selectedCategory: action.payload,
            }
        case actTypes.ADD_COMMENT:
            return {
                ...state,
                rented: {
                    car: action.payload.comment,
                    user: action.payload.user,
                }
            }
        case actTypes.LOAD_COMMENT:
            return {
                ...state,
                cars: action.payload,
            }
        case actTypes.LOAD_COMMENT_FAILED:
            return {
                ...state,
                commentsLoadError: action.payload,
            }
        case actTypes.lOAD_RENTS:
            return {
                ...state,
                rents: action.payload,
            }
        default:
            return state;
    }
}