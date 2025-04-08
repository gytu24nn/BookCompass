import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("") //används inte just nu
    const navigate = useNavigate();

    const handleCreateAccount = (e: React.FormEvent) => {
        e.preventDefault();

        const user = {
            email: email
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("loggedInUser", email);
        navigate("/login");
    }
    
    return(
        <>
            <h1>Skapa konto:</h1>
            <form onSubmit={handleCreateAccount}>
                <label htmlFor="emailCreateAccountInput">Email:</label>
                <input 
                    id="emailCreateAccountInput"
                    type="text"
                    placeholder="Enter your email address..."
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} required
                />
                
                <label htmlFor="passwordCreateAccountInput">Password:</label>
                <input 
                    id="passwordCreateAccountInput"
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