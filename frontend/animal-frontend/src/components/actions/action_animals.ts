import {
    AnimalAction,
    AnimalActionTypes,
    IAddNewAnimal,
    IAnimalModel,
    ISearchAnimalByIdModel,
    ISearchItem,
    DeleteAnimalAction
} from "../AnimalList/types";
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
            console.log("Error fetch list animals :", error);
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
            console.log("Error add new animal:", error);
            return Promise.reject();
        }

    }

export const FetchAnimalById =
    (search: ISearchItem) => async (dispatch: Dispatch<AnimalAction>) => {
        try {
            const response = await http.get<ISearchAnimalByIdModel>(`/item/${search.id}`);
            const { data } = response;
            console.log(response);
            dispatch({
                type: AnimalActionTypes.FETCH_ANIMAL_BY_ID,
                payload: response.data

            });

            return Promise.resolve<ISearchAnimalByIdModel>(data);

        } catch (error) {

            console.log("Error fetch animal by id :", error);
            return Promise.reject();

        }
    }

export const DeleteAnimals =
    (deleteId: number) => async (dispatch: Dispatch<DeleteAnimalAction>) => {
        try {
            const response = await http.delete(`/delete/${deleteId}`);
            console.log(response.status);
            dispatch({
                type: AnimalActionTypes.DELETE_ANIMAL_BY_ID,
                payload: deleteId
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error delete animal:", error);
            return Promise.reject();
        }

    }