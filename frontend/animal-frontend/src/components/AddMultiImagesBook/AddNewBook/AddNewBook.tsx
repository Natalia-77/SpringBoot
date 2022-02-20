import { IAddBook,IAddImage } from '../BookList/types';
import TextInput from '../../../common/TextInput';
import ImageInputMulti from '../../../common/ImageInputMulti';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useEffect } from "react";
import { useFormik, FormikHelpers, Formik, Form } from "formik";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from 'react-router';
import * as React from 'react';
import "cropperjs/dist/cropper.min.css";



const initialValues: IAddBook = {
    name: "",
    description: "",
    urlImage: [
        {
            //id:0,
            urlImage:''
        }
    ]

};
const AddNewBook: React.FC = () => {

    const navigator = useNavigate();
    const { addbooks } = useActions();
    const { status } = useTypedSelector((store) => store.bookinstance);
    console.log("Status:", status);      
    
    const [cropImages, setCropImages] = React.useState<Array<IAddImage>>([
        {    
            urlImage:''
        },
        {        
             urlImage:''
        }
    ]);

    const onSubmit = (values: IAddBook, helpers: FormikHelpers<IAddBook>) => {
        console.log("Values", values);
        addbooks({ ...values,urlImage:cropImages.filter((item)=>item.urlImage!=="")});
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

    const addImageHandler = (imageBase64:string) =>  {
        console.log("base64",imageBase64)
        setCropImages((prevState) => 
          prevState.map((item) => {              
            return {
                ...item,imageBase64
            } ;
          }),
        );
      };

    const { errors, touched, handleChange, values, setFieldValue } = formik;

    return (
        <>
            <div className="row">
                <h1 className="text-center">Додати нову книжку</h1>
               


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
                        field="description"
                        label="Власник"
                        type="text"
                        touched={touched.description}
                        error={errors.description}
                        value={values.description}
                        onChange={handleChange}
                    /> 
                              
                             
                {  cropImages.map((item) =>
         
         {
            return ( 
                  <ImageInputMulti
                     //key={item.id}
                      label="Фото"
                      field="urlImage"
                      onChange={() => {}}
                      error={errors.urlImage}
                      touched={touched.urlImage}
                      uploadImageHandler={addImageHandler}
                      //refFormik={setFieldValue}
                      type="file"
                  />);
            })}                  

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Go!
                        </button>
                    </div>
                </form>
                <div className="col-4"></div>
            </div>
        </>
    )
};

export default AddNewBook;