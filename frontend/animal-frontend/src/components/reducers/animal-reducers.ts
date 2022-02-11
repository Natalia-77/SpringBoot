
import { AnimalState, AnimalAction, AnimalActionTypes } from "../AnimalList/types";

const initialState: AnimalState = {

    animal: [],
    status: "",
    searchedAnimalById: {
        id: 0,
        name: "",
        owner: "",
        urlImage:""
    }
};

export const animalReducer = (state = initialState, action: AnimalAction): AnimalState => {
    switch (action.type) {

        case AnimalActionTypes.FETCH_ANIMAL_SUCCESS:
            return {
                ...state,
                animal: action.payload,
                status: ''
            };

        case AnimalActionTypes.ADD_ANIMAL_SUCCESS:
            return {
                ...state,
                status: action.payloads
            };

        case AnimalActionTypes.FETCH_ANIMAL_BY_ID:
            return {
                ...state,
                searchedAnimalById: {
                    id: action.payload.id,
                    name: action.payload.name,
                    owner: action.payload.owner,
                    urlImage:action.payload.urlImage
                }
            };

            case AnimalActionTypes.DELETE_ANIMAL_BY_ID:
            return {
                ...state,
                animal:state.animal.filter((item)=>item.id!==action.payload)
            };

        default:
            return state;
    }
};
