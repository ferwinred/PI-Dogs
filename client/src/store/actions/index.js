import axios from 'axios';
import {API_DB,} from '../../const'
  
export const GET_DOGS = 'GET_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_DETAILS = 'GET_DETAILS';
export const SORT = 'SORT';
export const FILTER_TYPE = 'FILTER_TYPE';

console.log(API_DB)

export function getDogs () {
    return async function (dispatch) {
        try{
        let dogs = await axios.get(`${API_DB}dogs`)
        console.log('Dogs del back: ', dogs)
            dispatch({
                type: GET_DOGS,
                payload: dogs.data
            });

        } catch(error){
            console.log(error);
        }
    }
};

export function searchDogs(search) {
    return async function (dispatch) {
        try {
        const dogs = await axios.get(`${API_DB}dogs?name=${search}`)
        console.log(dogs);
        return dispatch({
                type: SEARCH_DOGS,
                payload: dogs.data
        })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getTemperaments() {
    return async function(dispatch) {
        let temps = await axios.get(`${API_DB}temperaments`)
        return dispatch({ 
            type: GET_TEMPERAMENTS, 
            payload: temps.data
        })
    }
};

export function addDog(payload) {
    return function(dispatch) {
        const postDog = axios.post(`${API_DB}dogs`, payload)
        return postDog;
    }
};


export function getDetail(id) {
    return async function(dispatch) {
        try {
            let datos = await axios.get(`${API_DB}dogs/${id}`);
            console.log(id)
            console.log(datos.data)
            return dispatch({
                type: GET_DETAILS,
                payload: [datos.data]
            })
        } catch (error) {
            console.log(error)
        }
    }
};


export function sort (payload){
    return function (dispatch){
        return dispatch({
            type: SORT,
            payload
        })
    }
}

export function filterType (payload){
    return function (dispatch){
        return dispatch({
            type: FILTER_TYPE,
            payload
        })
    }
}

