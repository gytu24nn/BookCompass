import React from "react";
import InputField from "./InputField";
import ErrorMessage from "./ErrorMessage";

type SignupFormProps = {
    username: string; 
    email: string; 
    password: string; 
    confirmPassword: string; 
    onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onSubmit: (e: React.FormEvent) => void;
    errorMessage: string; 
}

const SignupForm = ({
    username,
    email,
    password,
    confirmPassword,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onSubmit,
    errorMessage,
}: SignupFormProps) => (
    <form onSubmit={onSubmit} className="formContainerLoginCreateAccount">
        <h1>Sign up:</h1>
        {errorMessage && <ErrorMessage message={errorMessage}/>}
        <InputField
            id="usernameCreateAccountInput"
            type="text"
            placeholder="Enter your username..."
            value={username}
            label="username:"
            onChange={onUsernameChange}
        />

        <InputField 
            id="emailCreateAccountInput"
            type="text"
            placeholder="Enter your email adress..."
            value={email}
            label="Email:"
            onChange={onEmailChange}
        />

        <InputField 
            id="passwordCreateAccountInput"
            type="password"
            placeholder="Enter your password..."
            value={password}
            label="Password:"
            onChange={onPasswordChange}
        />

        <InputField 
            id="confirmPasswordAccountInput"
            type="Password"
            placeholder="Confirm your password..."
            value={confirmPassword}
            label="Confirm password:"
            onChange={onConfirmPasswordChange}
        />

        <button type="submit">Sign up</button>

    </form>
);


export default SignupForm;