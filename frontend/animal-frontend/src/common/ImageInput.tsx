import { FC, InputHTMLAttributes,useState } from "react";
import classNames from 'classnames';

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    field: string,
    touched?: boolean | null,
    error?: string | null,
    type: string,
    refFormik: (field: string, value: string) => void,    
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const ImageInput: FC<ImageInputProps> = ({
    label,
    field,
    onChange,
    touched = null,
    error = null,
    refFormik,    
    type = "text" }: ImageInputProps) => {

        const[curImage,setCurImage]=useState("https://image.freepik.com/free-vector/photo-frame-icon-empty-photo-blank-vector-on-isolated-transparent-background-eps-10_399089-1290.jpg");
       
        const OnChangeHandler=(event : any) => {

            const file=event.currentTarget.files[0];

            // if(file){
            //     console.log("File:",file);
            //     refFormik.current.setFieldValue(field,file);
            // }
           setCurImage(URL.createObjectURL(file));    

           refFormik("field","kjhkhk");
            
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
                className={classNames("form-control d-none",
                    { "is-invalid": touched && error },
                    { "is-valid": touched && !error }
                )}
                id={field}
                onChange={OnChangeHandler}
            />
            {(touched && error) && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default ImageInput;