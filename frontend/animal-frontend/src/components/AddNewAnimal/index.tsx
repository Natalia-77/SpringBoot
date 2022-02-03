import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from 'react-router';
import { IAddNewAnimal } from "../AnimalList/types";
import TextInput from "../../common/TextInput";

const initialValues: IAddNewAnimal = {
    name: "",
    owner: ""

};
const AddNewAnimal: React.FC = () => {

    const navigator = useNavigate();
    const { AddAnimals } = useActions();
    const { status } = useTypedSelector((store) => store.animalinstance);
    console.log("Status:",status);
    const onSubmit = (values: IAddNewAnimal, helpers: FormikHelpers<IAddNewAnimal>) => {
        AddAnimals({ ...values });
    };

    const formik = useFormik({
        initialValues,
        onSubmit
    });

    useEffect(() => {
        if(status==200){
            console.log("useEffect done!")
            navigator("/");
        }

    }, [status, navigator]);

    const { errors, touched, handleChange, values } =  formik;

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