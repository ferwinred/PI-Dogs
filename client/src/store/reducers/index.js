import { GET_DOGS, SEARCH_DOGS, GET_TEMPERAMENTS, GET_DETAILS, SORT, FILTER_TYPE } from "../actions";
import {ASC, DB, DESC, ALL_TEMP, API, PESO_ASC, PESO_DESC} from '../../const'

const initialState = {
    dogs: [],
    filters: [],
    detail: [],
    temperaments: []
};

export default function reducer (state = initialState, action) {

    switch(action.type) {
        case GET_DOGS: 
            return {
                ...state,
                dogs: action.payload,
                filters: action.payload
            }
        case SEARCH_DOGS:
            let filterDog = action.payload;
            if(action.payload.length === 0) filterDog = [[]]
            return {
                ...state,
                filters: filterDog
            }
        case GET_TEMPERAMENTS:
            // console.log(action.payload)
            return {
                ...state,
                temperaments: action.payload
            }
        
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        case SORT:
            return {
                ...state,
                filters: [...state.filters.sort((a,b) => {
                    if(action.payload === ASC || action.payload === DESC){
                        if(a.name.toUpperCase() > b.name.toUpperCase()){
                            return action.payload === ASC ? 1 : -1
                        };
                        if(a.name.toUpperCase() < b.name.toUpperCase()){
                            return action.payload === ASC ? -1 : 1
                        };
                        return 0;
                    }
                
                    if(action.payload === PESO_ASC || action.payload === PESO_DESC){
                        if(parseInt(a.min_weight) > parseInt(b.min_weight)){
                            return action.payload === PESO_ASC ? 1 : -1;
                        }
                        if(parseInt(a.min_weight) < parseInt(b.min_weight)){
                            return action.payload === PESO_ASC ? -1 : 1;
                        }
                        return 0;
                    }
                
                    return 0;
                } )]
            }
        case FILTER_TYPE:
            const filters = ()=>{
                switch(action.payload){
                    case DB:  
                        return state.filters.filter(dog => dog.id.toString().length>3);
                    case API:
                        return state.filters.filter(dog => dog.id.toString().length<=3);
                    case ALL_TEMP:
                        const allDogs = state.dogs
                        return allDogs
                    
                    default:
                        const dogs = state.filters
                        const allFilter = state.dogs
                        console.log(dogs)
                        const tempFilter =
                        !Array.isArray(dogs[0])? dogs.filter((e) =>
                        !(e.id.length > 3)? e.temperaments.includes(action.payload) : e.temperaments.map(el => el.name).includes(action.payload)) : allFilter.filter((e) =>
                        !(e.id.length > 3)? e.temperaments.includes(action.payload) : e.temperaments.map(el => el.name).includes(action.payload));


                        return tempFilter.length > 0 ? tempFilter : [[]];        
                }; 
            }; 
            return {
                ...state,
                filters: filters()
            };
        default:
            return state;
    };
};