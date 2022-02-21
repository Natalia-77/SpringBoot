import {
    BookAction,
    IBookModel,
    BooksActionTypes,
    IFetchBooksErrorResponse,
    IAddBook
} from "../AddMultiImagesBook/BookList/types";
import { Dispatch } from "react";
import http from "../../books-http-common";
import axios, { AxiosError } from "axios";

export const fetchbooks = () => async (dispatch: Dispatch<BookAction>) => {

    try {
        const response = await http.get<Array<IBookModel>>("/listbooks");
        console.log(response.data);
        dispatch({
            type: BooksActionTypes.FETCH_BOOK_SUCCESS,
            payload: response.data,
        });

        return Promise.resolve();

    }
    catch (errors) {
        if (axios.isAxiosError(errors)) {

            const servererror = errors as AxiosError<IFetchBooksErrorResponse>;
            if (servererror && servererror.response) {
                dispatch({
                    type: BooksActionTypes.FETCH_BOOK_ERROR,
                    payload: servererror.response.data.errors
                })
                return Promise.reject(servererror.response.data);
            }
        }
        return Promise.reject(errors);

    }
}

export const addbooks =
    (data: IAddBook) => async (dispatch: Dispatch<BookAction>) => {
        try {
            const response = await http.post<IBookModel>("/addbook",data );
            console.log(response.status);
            dispatch({
                type:BooksActionTypes.ADD_BOOK_SUCCESS,
                payloads: response.status
            });

            return Promise.resolve();

        } catch (error) {
            console.log("Error add new book:", error);
            return Promise.reject();
        }

    }