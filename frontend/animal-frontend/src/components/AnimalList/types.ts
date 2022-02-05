export enum AnimalActionTypes {

    FETCH_ANIMAL_SUCCESS = "FETCH_ANIMAL_SUCCESS",
    FETCH_ANIMAL_ERROR = "FETCH_ANIMAL_ERROR",
    ADD_ANIMAL_SUCCESS = "ADD_ANIMAL_SUCCESS",
    FETCH_ANIMAL_BY_ID = "FETCH_ANIMAL_BY_ID",
    DELETE_ANIMAL_BY_ID = "DELETE_ANIMAL_BY_ID"

}

export interface IAnimalModel {

    id: number,
    name: string,
    owner: string
}

export interface ISearchAnimalByIdModel{
    id:number
    name:string
    owner:string
}

export interface AnimalState {

    animal: Array<IAnimalModel>
    status:number|string
    searchedAnimalById:ISearchAnimalByIdModel
   
}


export interface IAddNewAnimal {

    name: string;
    owner: string;
}

export interface ISearchItem {

    id: number
}

export interface IDeleteItem {

    id: number
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
    payload :ISearchAnimalByIdModel

}

export interface DeleteAnimalAction {
    type: AnimalActionTypes.DELETE_ANIMAL_BY_ID;
    payload: number;
  }

export type AnimalAction =
    FetchSuccessAnimalAction
    | AddSuccessAnimalAction
    | FetchAnimalITemById
    | DeleteAnimalAction;