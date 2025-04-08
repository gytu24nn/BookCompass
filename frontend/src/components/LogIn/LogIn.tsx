import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
    
        const storedData = localStorage.getItem("user");
    
        if(storedData) {
            const userData = JSON.parse(storedData); // Detta borde nu fungera korrekt
    
            if(userData.email === email) {
                localStorage.setItem("loggedInUser", email);
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
                    <label htmlFor="emailLoginInput">Email:</label>
                    <input 
                        type="text"
                        id="emailLoginInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
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