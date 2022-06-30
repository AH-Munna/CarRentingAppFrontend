import * as actTypes from './ActionType.js';
import axios from 'axios';

export const selectCategory = id => {
    return {
        type: actTypes.CATEGORY_SELECT,
        payload: id,
    }
}
export const commentAdd = (rentObj) => {
    return {
        type: actTypes.ADD_COMMENT,
        payload: {
            comment: rentObj.car,
            user: rentObj.user,
        }
    }
}
export const addFailed = error => {
    return {
        type: actTypes.ADD_COMMENT_FAILED,
        payload: error
    }
}

export const addBooking = bookingObj => dispatchEvent => {
    axios.post("http://127.0.0.1:8000/api/rent/", bookingObj)
        .then(response => {
            dispatchEvent(commentAdd(bookingObj))
        })
        .catch(error => {
            console.log(error);
            debugger
            // dispatchEvent(addFailed(error.message))
        });
}


const carsLoad = cars => {
    return {
        type: actTypes.LOAD_COMMENT,
        payload: cars
    }
}

export const loadCars = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/cars/')
        .then(response => dispatch(carsLoad(response.data)))
        .catch(error => console.log(error));
}

const loadRents = rents => {
    return {
        type: actTypes.lOAD_RENTS,
        payload: rents
    }
}
export const fetchRents = () => dispatchEvent => {
    axios.get('http://127.0.0.1:8000/api/rent/')
        .then(res => {
            dispatchEvent(loadRents(res.data))
        })
        .catch(err => {
            console.log(err);
        })
}