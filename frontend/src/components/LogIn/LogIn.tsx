import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    //här skapas useState för att användaren ska kunna logga in
    const [identifierInput, setIdentifierInput] = useState(""); // username eller email
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Visar felmeddelande vid fel
    const navigate = useNavigate(); //för att kunna programmera navigering

    /*
        Den här funktionen körs när användaren försöker logga in.
        - Hämtar användardata från localStorage
        - Jämför användarens input (email eller username + lösenord)
        - Om uppgifterna stämmer sparas användaren som inloggad och skickas till startsidan
        - Annars visas ett relevant felmeddelande
    */
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
    
        const storedData = localStorage.getItem("user");
    
        if(storedData) {
            const userData = JSON.parse(storedData);

            const isMatch = (identifierInput === userData.email || identifierInput === userData.username) &&
                password === userData.password;
    
            if(isMatch) {
                localStorage.setItem("loggedInUser", userData.username); //Sparar vem som är inloggad i localstorage med username
                navigate("/"); //skickar användaren till startsidan/home
                setErrorMessage(""); //nollställer felmeddelandet. 
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
                    {/* Visar felmeddelande om något blivit fel */}
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    
                    <label htmlFor="emailLoginInput">Email/Username:</label>
                    {/*Här är ett input fält som samlar in den information som skrivs plus att vi uppdaterar userState med de som skrivs in. */}
                    <input 
                        type="text"
                        id="emailLoginInput"
                        placeholder="Enter your username or email..."
                        value={identifierInput}
                        onChange={(e) => setIdentifierInput(e.target.value)} 
                        required
                    />
                    
                    <label htmlFor="passwordLoginInput">Password:</label>
                    {/*Här är ett input fält som samlar in den information som skrivs plus att vi uppdaterar userState med de som skrivs in. */}
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