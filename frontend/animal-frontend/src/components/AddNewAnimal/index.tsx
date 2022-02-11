import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState,useRef } from "react";
import { useFormik, FormikHelpers, Formik,Form } from "formik";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from 'react-router';
import { IAddNewAnimal } from "../AnimalList/types";
import TextInput from "../../common/TextInput";
// import ImgCrop from 'antd-img-crop';
// import { Upload } from 'antd';
import { Modal, Button, Upload, message, Row, Col } from 'antd';
import "cropperjs/dist/cropper.min.css";
import Cropper from "cropperjs";
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
   // const formikImage =React.useRef<HTMLInputElement|null>(null);
   // const formikImage =useRef();
    const imgRef=React.useRef<HTMLImageElement>(null);

    const [visible, setVisible] = React.useState(false);
    const [ima,setIma]=useState<string>();

    const onSubmit = (values: IAddNewAnimal, helpers: FormikHelpers<IAddNewAnimal>) => {
        AddAnimals({ ...values });
    };

    const fileChange =async  (e: any) => {

        const file = (e.target.files as FileList)[0];
        if (file) {
          const url = URL.createObjectURL(file);           
          await setVisible(true);
          setIma(url);
        // if ((e.target as HTMLInputElement).files) {
        //     setFieldValue("Image", e.target.files?.item(0));
        //     const file = (e.target.files as FileList)[0];
        //     setIma(URL.createObjectURL(file));
             console.log("Ima",ima);
        //     setVisible(true);
         }
    };

    const formik = useFormik({
        initialValues,
        onSubmit                 
    });

    useEffect(() => {
        if (status == 200) {
            console.log("useEffect done!")
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
                        onChange={fileChange}
                        error={errors.urlImage}
                        touched={touched.urlImage} 
                        refFormik={setFieldValue}                      
                        type="file"
                    />                  
                    

                    <Modal
                        title="Modal"
                        centered
                         visible={visible}
                         //onOk={handleCropped}
                        onCancel={() => setVisible(false)}
                        width={1000}
                        maskClosable={false}
                    > <Row gutter={[8, 8]}>
                            <Col md={18} xs={24}>
                                <div>
                                    <img src={ima}
                                         ref={imgRef} 
                                        width="100%" />
                                </div>
                            </Col>
                            <Col md={6} xs={24}>
                                <div
                                    // ref = {prevRef}
                                    style={{
                                        height: "150px",
                                        border: "1px solid silver",
                                        overflow: "hidden"
                                    }}>
                                </div>
                            </Col>
                        </Row>
                    </Modal>



                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            --Додати--
                        </button>

                        <button  type="button" className="btn btn-primary" onClick={()=>{setVisible(true)}}>
                            --Cropp--
                        </button>
                    </div>
                </form>
                <div className="col-4"></div>
            </div>
        </>
    )
};

export default AddNewAnimal;