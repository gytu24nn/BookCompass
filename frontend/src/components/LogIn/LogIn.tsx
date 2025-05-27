import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../CreateAccount/InputField";
import ErrorMessage from "../CreateAccount/ErrorMessage";
import { loginUser } from "../../apiFetch/auth";

const LogIn = () => {
    //här skapas useState för att användaren ska kunna logga in
    const [userNameInput, setUserNameInput] = useState(""); // username eller email
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
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        

        if(!userNameInput || !password) {
            setErrorMessage("All fields are required! try again");
            return;
        }

        try {
            await loginUser(userNameInput, password);
            localStorage.setItem("loggedInUser", userNameInput); // Spara inloggningsstatus i localStorage
            localStorage.setItem("token", "1234BookCompassToken"); // Spara användarnamn i localStorage
            navigate("/"); // Om inloggningen lyckas, navigera till startsidan
            setErrorMessage(""); // Rensa felmeddelandet om inloggningen lyckades

        } catch (error : any) {
            setErrorMessage(error.message || "Wrong username or password! Try again");
        }

    }

    return(
            <div >
                
                <form onSubmit={handleLogin} className="formContainerLoginCreateAccount">
                    <h1>Sign in:</h1>
                    {/* Visar felmeddelande om något blivit fel */}
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}

                    <InputField 
                        id="usernameSigninInput"
                        label="username:"
                        type="text"
                        value={userNameInput}
                        placeholder="Enter your username..."
                        onChange={(e) => setUserNameInput(e.target.value)}
                    />

                    <InputField 
                        id="passwordSigninInput"
                        label="password:"
                        type="password"
                        value={password}
                        placeholder="Enter your password..."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign in</button>
                </form>
            </div>
    )
}

export default LogIn;