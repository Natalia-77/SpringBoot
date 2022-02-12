import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect} from "react";
import { useFormik, FormikHelpers, Formik,Form } from "formik";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from 'react-router';
import { IAddNewAnimal } from "../AnimalList/types";
import TextInput from "../../common/TextInput";
import "cropperjs/dist/cropper.min.css";
import ImageInput from "../../common/ImageInput";
import * as React from "react";

const initialValues: IAddNewAnimal = {
    name: "",
    owner: "",
    urlImage: ""   

};
const AddNewAnimal: React.FC = () => {

    const navigator = useNavigate();
    const { AddAnimals } = useActions();
    const { status } = useTypedSelector((store) => store.animalinstance);
    console.log("Status:", status);
    //const formikImage =React.useRef() as React.MutableRefObject<HTMLInputElement>;    
    const imgRef=React.useRef<HTMLImageElement>(null);    

    const onSubmit = (values: IAddNewAnimal, helpers: FormikHelpers<IAddNewAnimal>) => {
        console.log("Values",values);
        AddAnimals({ ...values });
    };    

    const formik = useFormik({
        initialValues,
        onSubmit                     
    });

    useEffect(() => {
        if (status == 200) {
            console.log("useEffect done!");            
            navigator("/");
        }

    }, [status, navigator]);

    const { errors, touched, handleChange, values, setFieldValue } = formik;

    return (
        <>
            <div className="row">
                <h1 className="text-center">Додати нову тваринку</h1>                
                <form className="col-4" onSubmit={(e) => formik.handleSubmit(e)}>       
              
                   
                    <TextInput
                        field="name"
                        label="Ім'я"
                        type="text"
                        touched={touched.name}
                        error={errors.name}
                        value={values.name}
                        onChange={handleChange}
                    />

                    <TextInput
                        field="owner"
                        label="Власник"
                        type="text"
                        touched={touched.owner}
                        error={errors.owner}
                        value={values.owner}
                        onChange={handleChange}
                    />

                    <ImageInput
                        label="Фото"
                        field="urlImage"
                        onChange={()=>{}}
                        error={errors.urlImage}
                        touched={touched.urlImage} 
                        refFormik={setFieldValue}                      
                        type="file"
                    />             
                                       
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            --Додати--
                        </button>
                    </div>
                </form>
                <div className="col-4"></div>
            </div>
        </>
    )
};

export default AddNewAnimal;