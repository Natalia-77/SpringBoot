import { FC, InputHTMLAttributes, useState, useRef } from "react";
import classNames from 'classnames';
import { Modal, Button, Row, Col } from 'antd';
import "cropperjs/dist/cropper.min.css";
import Cropper from "cropperjs";

interface ImageInputMultiProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    field: string,
    touched?: boolean | null,
    error?: string | null,
    type: string,
    uploadImageHandler: (imageBase64: string) => any;
   // refFormik: (field: string, value: any) => void,   
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const ImageInput: FC<ImageInputMultiProps> = ({
    label,
    field,
    onChange,
    touched = null,
    error = null,
    uploadImageHandler,
    //refFormik,
    type = "text" }: ImageInputMultiProps) => {

    const [curImage, setCurImage] = useState("https://image.freepik.com/free-vector/photo-frame-icon-empty-photo-blank-vector-on-isolated-transparent-background-eps-10_399089-1290.jpg");
    const [visible, setVisible] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(true);//у вікні кропера не буде цієї кнопки("Хочу обрізати фото!",бо ми вже і так будемо в ркжимі обрізки
    const [modalImage, setModalImage] = useState<string>("");
    const imgRef = useRef<HTMLImageElement>(null);
    const prevRef = useRef<HTMLImageElement>(null);
    const [cropperObj, setCropperObj] = useState<Cropper>();

    const OnChangeHandler = async (event: any) => {

        const file = (event.target.files as FileList)[0];
        setCurImage(URL.createObjectURL(file));    

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function () {
            console.log('RESULT', fileReader.result);
           // refFormik(field, fileReader.result);
            setModalImage(fileReader.result as string);            
        }
        await setVisible(true);
        
    }

    const cropShow = async () => {
        setButtonVisible(false);//ми в режимі обрізки фото,тому ця кнопка ховається
        let cropper = new Cropper(imgRef.current as HTMLImageElement, {
            aspectRatio: 4 / 3,
            viewMode: 1,
            preview: prevRef.current as HTMLImageElement ,
            background: true
        });
        cropper?.replace(modalImage);
        setCropperObj(cropper);
        console.log("Cropper",cropper);
        
    };

    const handleCropped=async()=>{
        const base64=cropperObj?.getCroppedCanvas().toDataURL() as string;
        console.log("base64", base64);       
        if(base64)
        {
            setCurImage(base64);
         await uploadImageHandler(base64);
            //refFormik("urlImage", base64);
        }
        else{
           // refFormik("urlImage",modalImage);  
           await uploadImageHandler(modalImage);
        }
             
        setVisible(false);
    }

    return (
        <div className="mb-3 ">
            <label htmlFor={field} className="form-label">

                <img src={curImage}
                    alt="animalphoto"
                    width="150"
                    style={{ cursor: "pointer" }} />
            </label>
            <input
                type="file"
                name={field}
                className={classNames("form-control",
                    { "is-invalid": touched && error },
                    { "is-valid": touched && !error }
                )}
                id={field}
                onChange={OnChangeHandler}
            />
            {(touched && error) && <div className="invalid-feedback">{error}</div>}

            <Modal
                title="Modal"
                centered
                visible={visible}
                onOk={handleCropped}
                onCancel={() => setVisible(false)}
                width={1000}
                maskClosable={false}
            >
                 <Row gutter={[8, 8]}>
                    <Col md={18} xs={24}>
                        <div>
                            <img src={modalImage}
                                ref={imgRef}
                                width="70%" />
                        </div>
                    </Col>

                    <Col md={6} xs={24}>
                        { <div                                          
                            ref={prevRef}                            
                            style={{
                                height: "150px",                               
                                overflow: "hidden"
                            }}>
                        </div> }
                    </Col>
                </Row>
                {buttonVisible ?
                    <Button type="primary" className="mt-3" onClick={cropShow}>Хочу обрізати фото!</Button> : ""}
            </Modal>
        </div>

    );
};

export default ImageInput;