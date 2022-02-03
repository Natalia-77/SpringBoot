import { FC } from "react";
import classNames from 'classnames';

interface TextInputProps  {
    label: string,
    field: string,
    touched?: boolean,
    error?: string | null,
    type?: "text",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: FC<TextInputProps> = ({ 
    label, 
    field,
    touched,
    error = null,
    type = "text",
    onChange,  
    }) => {
    return (
        <div className="mb-3">
            <label htmlFor={field} className="form-label">
                {label}
            </label>
            <input
                type={type}
                name={field}
                className={classNames("form-control",
                    { "is-invalid": touched && error },
                    { "is-valid": touched && !error }
                )}
                id={field}
                onChange={onChange}
            />
            {(touched && error) && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default TextInput;