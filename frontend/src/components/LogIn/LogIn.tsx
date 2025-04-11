import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const [identifierInput, setIdentifierInput] = useState(""); // username eller email
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
    
        const storedData = localStorage.getItem("user");
    
        if(storedData) {
            const userData = JSON.parse(storedData);

            const isMatch = (identifierInput === userData.email || identifierInput === userData.username) &&
                password === userData.password;
    
            if(isMatch) {
                localStorage.setItem("loggedInUser", userData.username);
                navigate("/");
                setErrorMessage("");
            } else {
                setErrorMessage("Wrong username or password! Try again!")
            }
        } else {
            setErrorMessage("Your account doesn´t exist. Try to create a account first!")
        }
    }
    return(
            <div >
                
                <form onSubmit={handleLogin} className="formContainerLoginCreateAccount">
                    <h1>Login:</h1>
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    <label htmlFor="emailLoginInput">Email/Username:</label>
                    <input 
                        type="text"
                        id="emailLoginInput"
                        placeholder="Enter your username or email..."
                        value={identifierInput}
                        onChange={(e) => setIdentifierInput(e.target.value)} 
                        required
                    />
                    
                    <label htmlFor="passwordLoginInput">Password:</label>
                    <input 
                        type="password" 
                        id="passwordLoginInput"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
    )
}

export default LogIn;