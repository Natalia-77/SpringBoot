export enum AnimalActionTypes {

    FETCH_ANIMAL_SUCCESS = "FETCH_ANIMAL_SUCCESS",
    FETCH_ANIMAL_ERROR = "FETCH_ANIMAL_ERROR",
    ADD_ANIMAL_SUCCESS = "ADD_ANIMAL_SUCCESS",
    FETCH_ANIMAL_BY_ID = "FETCH_ANIMAL_BY_ID"

}

export interface IAnimalModel {

    id: number,
    name: string,
    owner: string
}

export interface AnimalState {

    animal: Array<IAnimalModel>
    status:number|string
    searchedAnimalById:IAnimalModel
   
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

export interface FetchAnimalITemById{
    type:AnimalActionTypes.FETCH_ANIMAL_BY_ID;
    payload :ISearchAnimalById

}


export type AnimalAction =
    FetchSuccessAnimalAction
    | AddSuccessAnimalAction;