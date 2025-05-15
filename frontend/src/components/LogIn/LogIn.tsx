import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    //här skapas useState för att användaren ska kunna logga in
    const [userNameInput, setUserNameInput] = useState(""); // username eller email
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Visar felmeddelande vid fel
    const [isLoading, setIsLoading] = useState(false); // Visar laddningsindikator
    const navigate = useNavigate(); //för att kunna programmera navigering

    /*
        Den här funktionen körs när användaren försöker logga in.
        - Hämtar användardata från localStorage
        - Jämför användarens input (email eller username + lösenord)
        - Om uppgifterna stämmer sparas användaren som inloggad och skickas till startsidan
        - Annars visas ett relevant felmeddelande
    */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Sätter isLoading till true för att visa laddningsindikator
        

        if(!userNameInput || !password) {
            setErrorMessage("All fields are required! try again");
            return;
        }

        try {
           const result = await fetch("http://localhost:5175/api/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 1234BookCompassToken",
                },
                body: JSON.stringify({
                    userName: userNameInput,
                    password: password
                }),
            });

            if(result.ok) {
                const data = await result.json();
                localStorage.setItem("loggedInUser", userNameInput);
                localStorage.setItem("token", "1234BookCompassToken");
                navigate("/");
                setErrorMessage("");
            } else {
                const error = await result.json();
                setErrorMessage(error.message || "wrong username or password! try again");
            } 
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while logging in. Please try again later!");
        }
    
        
    }

    return(
            <div >
                
                <form onSubmit={handleLogin} className="formContainerLoginCreateAccount">
                    <h1>Sign in:</h1>
                    {/* Visar felmeddelande om något blivit fel */}
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    
                    <label htmlFor="emailLoginInput">Username:</label>
                    {/*Här är ett input fält som samlar in den information som skrivs plus att vi uppdaterar userState med de som skrivs in. */}
                    <input 
                        type="text"
                        id="emailLoginInput"
                        placeholder="Enter your username..."
                        value={userNameInput}
                        onChange={(e) => setUserNameInput(e.target.value)} 
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
                    <button type="submit">Sign in</button>
                </form>
            </div>
    )
}

export default LogIn;