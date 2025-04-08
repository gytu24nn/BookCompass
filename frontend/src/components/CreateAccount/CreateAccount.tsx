import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("") //används inte just nu
    const navigate = useNavigate();

    const handleCreateAccount = (e: React.FormEvent) => {
        e.preventDefault();

        localStorage.setItem("user", email);
        localStorage.setItem("loggedInUser", email);
        navigate("/");
    }
    
    return(
        <>
            <h1>Skapa konto:</h1>
            <form onSubmit={handleCreateAccount}>
                <label htmlFor="emailAdressInput">Email:</label>
                <input 
                    id="emailAdressInput"
                    type="text"
                    placeholder="Enter your email address..."
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} required
                />
                
                <label htmlFor="passwordInput">Password:</label>
                <input 
                    id="passwordInput"
                    type="password"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button type="submit">Create account</button>
            </form>    
        </>
    )
}

export default CreateAccount;