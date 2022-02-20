import { IAddBook, IAddImage } from "../BookList/types";
import TextInput from "../../../common/TextInput";
import ImageInputMulti from "../../../common/ImageInputMulti";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useEffect } from "react";
import { useFormik, FormikHelpers, Formik, Form } from "formik";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router";
import * as React from "react";
import CropperModal from "../../../common/CropperModal";
import { Col, Row } from "antd";
import http, {urlBackend} from '../../../books-http-common';

const initialValues: IAddBook = {
  name: "",
  description: "",
  images: [],
};
const AddNewBook: React.FC = () => {
  const [images, setImages] = React.useState<Array<string>>([]);
  const navigator = useNavigate();
  const { addbooks } = useActions();
  const { status } = useTypedSelector((store) => store.bookinstance);
  console.log("Status:", status);

  const [cropImages, setCropImages] = React.useState<Array<IAddImage>>([
    {
      urlImage: "",
    },
    {
      urlImage: "",
    },
  ]);

  const onSubmit = (values: IAddBook, helpers: FormikHelpers<IAddBook>) => {
    console.log("Values", values);
    addbooks({
      ...values,
       images });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    if (status == 200) {
      console.log("useEffect done!");
      navigator("/");
    }
  }, [status, navigator]);

  const addImageHandler = async (imageBase64: string) => {
    console.log("base64", imageBase64);
    const imgName = await http.post<string>("upload", {base64: imageBase64});
    setImages([...images,imgName.data]);
    //setCropImages();
  };

  const { errors, touched, handleChange, values, setFieldValue } = formik;

  const dataImages = images.map((item, key) => {
    return (
      <Col md={8} key={key}>
        <div>
          <img src={urlBackend+"books/image/"+item} alt="images" width="100%" />
        </div>
      </Col>
    );
  });

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
          <Row gutter={[8, 8]}>
            {dataImages}
            <Col md={8}>
              <CropperModal onSelected={addImageHandler} />
            </Col>
          </Row>

          {/* {  cropImages.map((item) =>
         
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
            })}                   */}

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Go!
            </button>
          </div>
        </form>
        <div className="col-4"></div>
      </div>
    </>
  );
};

export default AddNewBook;
