import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const [identifierInput, setIdentifierInput] = useState(""); // username eller email
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
    
        const storedData = localStorage.getItem("user");
    
        if(storedData) {
            const userData = JSON.parse(storedData);

            const isMatch = (identifierInput === userData.email || identifierInput === userData.username)
    
            if(isMatch) {
                localStorage.setItem("loggedInUser", userData.username);
                navigate("/");
            } else {
                alert("Fel användarnamn eller lösenord.");
            }
        } else {
            alert("Inget konto hittades.");
        }
    }
    return(
        <>
            <div>
                <h1>Login:</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="emailLoginInput">Email/Username:</label>
                    <input 
                        type="text"
                        id="emailLoginInput"
                        value={identifierInput}
                        onChange={(e) => setIdentifierInput(e.target.value)} 
                        required
                    />
                    
                    <label htmlFor="passwordLoginInput">Password:</label>
                    <input 
                        type="password" 
                        id="passwordLoginInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default LogIn;