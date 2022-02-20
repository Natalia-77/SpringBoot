export enum BooksActionTypes {

    FETCH_BOOK_SUCCESS = "FETCH_BOOK_SUCCESS",
    FETCH_BOOK_ERROR = "FETCH_BOOK_ERROR",
    ADD_BOOK_SUCCESS = "ADD_BOOK_SUCCESS",
    
}

export interface IImagesModel {

    id: number
    urlImage: string
}

export interface IBookModel {

    id: number
    name: string
    description: string
    urlImage:Array<IImagesModel>
}

export interface BookState {

    book: Array<IBookModel>
    status:number|string
    error:string    
   
}
 export interface IAddImage{

    //id:number
    urlImage:string

 }

export interface IAddBook {

    name: string
    description: string
    images?:Array<string>
   
}

export interface IFetchBooksErrorResponse {
    errors:string 
}

export interface FetchSuccessBookAction {
    type: BooksActionTypes.FETCH_BOOK_SUCCESS;
    payload: Array<IBookModel>;
}

export interface AddSuccessBookAction {
    type: BooksActionTypes.ADD_BOOK_SUCCESS;
    payloads: string |number;
}

export interface FetchErrorBooksAction{
    type:BooksActionTypes.FETCH_BOOK_ERROR;
    payload: string

}

export type BookAction =
 FetchSuccessBookAction
 | AddSuccessBookAction
 | FetchErrorBooksAction;
