import {combineReducers} from "redux";
import { animalReducer } from "../../components/reducers/animal-reducers";


export const rootReducer = combineReducers({

    animalinstance: animalReducer    
})

export type RootState = ReturnType<typeof rootReducer>