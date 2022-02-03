import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";

const AddNewAnimal: React.FC = () => {

    // const { animal } = useTypedSelector((store) => store.animalinstance);

    // const { FetchAnimals } = useActions();

    // useEffect(() => {

    //     FetchAnimals();

    // }, []);

    // return (
    //     <>
    //         {<table className=" table table-bordered mt-5" style={{borderColor:'#00008B'}}>                
    //             <thead className="table-dark">
    //                 <tr>                        
    //                     <th scope="col">Id</th>
    //                     <th scope="col">Name</th>
    //                     <th scope="col">Owner</th>
    //                 </tr>
    //             </thead>
    //             {<tbody>
    //                 {animal.map((item) => {
    //                     return (
    //                         <tr key={item.id}>
    //                             <th scope="row">{item.id}</th>
    //                             <td>{item.name}</td>
    //                             <td>{item.owner}</td>
    //                         </tr>
    //                     );
    //                 })}
    //             </tbody>}
    //         </table>}

    //     </>
    // );
    return(
        <h1>dwdwwdwdwd</h1>
    )
};

export default AddNewAnimal;