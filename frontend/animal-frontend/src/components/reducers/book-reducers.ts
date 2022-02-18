import {
    BookState,
    BookAction,
    BooksActionTypes
} from "../AddMultiImagesBook/BookList/types";

const initialState: BookState = {
    book: [],
    status: '',
    error: ''
};

export const bookreducer = (state = initialState, action: BookAction): BookState => {
    switch (action.type) {

        case BooksActionTypes.FETCH_BOOK_SUCCESS:
            return {
                ...state,
                book: action.payload,
                status: ''
            };
        case BooksActionTypes.FETCH_BOOK_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case BooksActionTypes.ADD_BOOK_SUCCESS:
            return {
                ...state,
                status: action.payloads
            };


        default:
            return state;
    }

}