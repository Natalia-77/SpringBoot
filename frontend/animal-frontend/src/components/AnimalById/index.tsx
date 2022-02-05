import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { ISearchItem } from '../AnimalList/types';
import { useActions } from "../../hooks/useActions";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AnimalSearch: React.FC = () => {

    const res = useParams();      
    const { searchedAnimalById } = useTypedSelector((store) => store.animalinstance);    
    const [ide, setIde] = useState<number>();
    const { FetchAnimalById } = useActions();

    async function getProducts(search: ISearchItem) {

        try {
            await FetchAnimalById(search);

        } catch (ex) {
            console.log("Error fetch in component id:", ex);

        }
    }

    useEffect(() => {       
       
        const result=Number(res.id);        
        //console.log("Res",res.id);
        setIde(result);
        const search: ISearchItem = {
            id: result
        };
        getProducts(search);
        //console.log("Search",search);
    }, []);

    
    return (
        <>
        <h1>Деталі по тваринці:</h1>           
           
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Owner</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={searchedAnimalById.id}>
                        <th scope="row">{searchedAnimalById.id}</th>
                        <td>{searchedAnimalById.name}</td>
                        <td>{searchedAnimalById.owner}</td>
                    </tr>                      


                </tbody> 
            </table> 
            <Link className="btn btn-info" to={'/'}>На головну</Link>

        </>
    )

}
export default AnimalSearch;