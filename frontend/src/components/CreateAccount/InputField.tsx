import React from "react";

type InputFieldProps = {
    id: string;
    type: string; 
    placeholder: string;
    value: string; 
    label: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
};

const InputField = ({id, type, placeholder, value, label, onChange}: InputFieldProps ) => (
    <>
        <label htmlFor={id}>{label}</label>
        <input 
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required 
        />
    </>
)

export default InputField;