import {
    BookAction,
    IBookModel,
    BooksActionTypes,
    IFetchBooksErrorResponse
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