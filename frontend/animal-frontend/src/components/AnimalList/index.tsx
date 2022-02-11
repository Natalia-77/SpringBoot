import http from "../../http-common";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { Link } from 'react-router-dom';


const AnimalList: React.FC = () => {

    const { animal } = useTypedSelector((store) => store.animalinstance);
    const { FetchAnimals, DeleteAnimals } = useActions();

    useEffect(() => {

        FetchAnimals();

    }, []);

    const handleDelete = (id: number) => {

        DeleteAnimals(id);
    }


    return (
        <>
            {<table className=" table table-bordered mt-5" style={{ borderColor: '#00008B' }}>
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Image</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                {<tbody>
                    {animal.map((item) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.owner}</td>
                                <td>
                                    <img src={item.urlImage}
                                        alt="photos"
                                        width="100"
                                    />
                                </td>
                                <td>
                                    <div className="mx-5">
                                        <Link className="btn btn-info" to={`/animals/item/${item.id}`}>Детальніше</Link>

                                        <button className="btn btn-danger ml-2" onClick={() => { handleDelete(item.id); }}>Видалити</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>}
            </table>}

        </>
    );
};

export default AnimalList;