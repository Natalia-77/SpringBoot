import { AnimalAction, AnimalActionTypes, IAddNewAnimal, IAnimalModel } from "../AnimalList/types";
import { Dispatch } from "react";
import http from "../../http-common";

export const FetchAnimals =
    () => async (dispatch: Dispatch<AnimalAction>) => {
        try {
            const response = await http.get<Array<IAnimalModel>>("/list");
            console.log(response.data);
            dispatch({
                type: AnimalActionTypes.FETCH_ANIMAL_SUCCESS,
                payload: response.data,
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error:", error);
            return Promise.reject();
        }
    };


export const AddAnimals =
    (data: IAddNewAnimal) => async (dispatch: Dispatch<AnimalAction>) => {
        try {
            const response = await http.post<IAnimalModel>("/add", data);
            console.log(response.status);
            dispatch({
                type: AnimalActionTypes.ADD_ANIMAL_SUCCESS,
                payloads: response.status
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error:", error);
            return Promise.reject();
        }

    }