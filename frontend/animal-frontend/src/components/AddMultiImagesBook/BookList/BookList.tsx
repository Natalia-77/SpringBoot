import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";

const BookList: React.FC = () => {

    const { book } = useTypedSelector((store) => store.bookinstance);
    const { fetchbooks } = useActions();

    useEffect(() => {

        fetchbooks();

    }, []);

    return (
        <>
            {<table className=" table table-bordered mt-5" style={{ borderColor: '#00008B' }}>
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Images</th>
                    </tr>
                </thead>
                {<tbody>
                    {book.map((item) => {
                        return (
                            <tr key={item.id}>
                                { <th scope="row">{item.id}</th> }
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    {item.urlImage.map((items) => {
                                        return (

                                            <img src={items.urlImage}
                                                alt="photos"
                                                width="100"
                                                className="m-2" />
                                        );
                                    })}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>}
            </table>}

        </>
    );
};

export default BookList;