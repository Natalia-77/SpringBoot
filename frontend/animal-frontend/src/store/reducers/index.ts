import {combineReducers} from "redux";
//import { authReducer } from "../../components/authorize/Login/login_reducer";
//import{prodReducer} from "../../components/products/product_reducer";

export const rootReducer = combineReducers({
    //log: authReducer,
    //prod:prodReducer
})

export type RootState = ReturnType<typeof rootReducer>