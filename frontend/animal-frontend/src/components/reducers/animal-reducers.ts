
import { AnimalState, AnimalAction, AnimalActionTypes } from "../AnimalList/types";

const initialState: AnimalState = {

    animal: [],
    status: ""

};

export const animalReducer = (state = initialState, action: AnimalAction): AnimalState => {
    switch (action.type) {

        case AnimalActionTypes.FETCH_ANIMAL_SUCCESS:
            return {
                ...state,
                animal: action.payload,
                status:""
            };

        case AnimalActionTypes.ADD_ANIMAL_SUCCESS:
            return {
                ...state,
                status: action.payloads
            };

        default:
            return state;
    }
};
