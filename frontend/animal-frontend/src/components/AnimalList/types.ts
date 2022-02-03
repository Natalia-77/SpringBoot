export enum AnimalActionTypes {

    FETCH_ANIMAL_SUCCESS = "FETCH_ANIMAL_SUCCESS",
    FETCH_ANIMAL_ERROR = "FETCH_ANIMAL_ERROR",
    ADD_ANIMAL_SUCCESS = "ADD_ANIMAL_SUCCESS"

}

export interface IAnimalModel {

    id: number,
    name: string,
    owner: string
}

export interface AnimalState {

    animal: Array<IAnimalModel>
    status:string|number;
   
}


export interface IAddNewAnimal {
    name: string;
    owner: string;

}

export interface ISearchAnimalById {

    id: number
}

export interface IFetchErrorResponse {

    errors: string
}

export interface FetchSuccessAnimalAction {
    type: AnimalActionTypes.FETCH_ANIMAL_SUCCESS;
    payload: Array<IAnimalModel>;
}

export interface AddSuccessAnimalAction {
    type: AnimalActionTypes.ADD_ANIMAL_SUCCESS;
    payloads: string |number;
}


export type AnimalAction =
    FetchSuccessAnimalAction
    | AddSuccessAnimalAction;