import {combineReducers} from "redux";
import { animalReducer } from "../../components/reducers/animal-reducers";
import { bookreducer } from "../../components/reducers/book-reducers";


export const rootReducer = combineReducers({

    animalinstance: animalReducer,
    bookinstance: bookreducer
})

export type RootState = ReturnType<typeof rootReducer>