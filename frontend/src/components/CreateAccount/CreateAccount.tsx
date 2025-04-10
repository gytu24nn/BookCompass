import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const [emailInput, setEmailInput] = useState("");
    const [usernameInput, setUsernameInput] =useState("");
    const [passwordInput, setPasswordInput] = useState(""); //används inte just nu
    const [accountCreated, setAccountCreated] = useState(false);
    const navigate = useNavigate();

    const handleCreateAccount = (e: React.FormEvent) => {
        e.preventDefault();

        const user = {
            email: emailInput,
            username: usernameInput
        };

        localStorage.setItem("user", JSON.stringify(user));
        setAccountCreated(true);
    }

    useEffect(() => {
        if(accountCreated) {
            const timer = setTimeout(() => {
                navigate("/login")
            }, (2000));

            return () => clearTimeout(timer)
        }
        
    }, [accountCreated, navigate])
    
    return(
        <div >
            

            {accountCreated ? (
                <div className="accountCreatedContainer">
                    <div id="spinningWheelLoading"></div>
                    <p>
                        Ditt konto har skapats. Du blir nu skickad till inloggningssidan... 
                    </p>
                </div>
                
            ) : (
                <form onSubmit={handleCreateAccount} className="formContainerLoginCreateAccount">
                    <h1>Skapa konto:</h1>
                    <label htmlFor="usernameCreateAccountInput">Username:</label>
                    <input 
                        id="usernameCreateAccountInput"
                        type="text"
                        placeholder="Enter your username..."
                        value={usernameInput} 
                        onChange={(e) => setUsernameInput(e.target.value)}
                        required
                    />

                    <label htmlFor="emailCreateAccountInput">Email:</label>
                    <input 
                        id="emailCreateAccountInput"
                        type="text"
                        placeholder="Enter your email address..."
                        value={emailInput} 
                        onChange={(e) => setEmailInput(e.target.value)} 
                        required
                    />
                
                    <label htmlFor="passwordCreateAccountInput">Password:</label>
                    <input 
                        id="passwordCreateAccountInput"
                        type="password"
                        placeholder="Enter your password..."
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required 
                    />
                    <button type="submit">Create account</button>
                </form>  
            )}

                
        </div>
    )
}

export default CreateAccount;