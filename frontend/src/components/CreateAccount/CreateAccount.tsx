import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    // Här skapas alla useStates som behövs för att en användare ska kunna skapa ett konto
    const [emailInput, setEmailInput] = useState("");
    const [usernameInput, setUsernameInput] =useState("");
    const [passwordInput, setPasswordInput] = useState(""); 
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Det skapas då en user-variabel som samlar in all information från formuläret
    // och sparar det i localStorage med nyckeln "user"

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        if(passwordInput !== confirmPasswordInput) 
        {
            setErrorMessage("passwords do not match! try again");
            return;
        }

        // Kontrollera att e-postadressen har ett giltigt format: [något]@[något].[något]
        // Exempelvis: test@example.com – annars visas ett felmeddelande.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(emailInput))
        {
            setErrorMessage("Invalid email format! try again");
            return;
        }

        if(passwordInput.length < 6)
        {
            setErrorMessage("Password must be at least 6 characters long! try again");
            return;
        }

        if(!usernameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
            setErrorMessage("All fields are required! try again");
            return;
        }

        try {
            const result = await fetch("http://localhost:5175/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 1234BookCompassToken"
                },
                body: JSON.stringify({
                    userName: usernameInput,
                    email: emailInput,
                    password: passwordInput,
                    confirmPassword: confirmPasswordInput,
                }),
            });

            if(result.ok) 
            {
                setAccountCreated(true);
                setErrorMessage("");
            } else {
                const error = await result.json();
                setErrorMessage(error.message || "Could not create account");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while creating the account. try again later!"); 
        }
    };
        //När setAccountCreated blir true så aktiveras denna useEffect och den startar en timer på 2 sekunder och när 2 sekunder varit skickas användaren vidare till
        //login. Däremot om användaren väljer att byta sidan innan de 2 sekunderna avbryts timern för att användaren ej ska förflyttas om den ej vill de.   
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
            
            {/*
                Här gör jag en kort if sats som skriver kollar om kontot skapat och om det har de så visas denna text med en spinningwheel. 
                Om accountCreated inte ändrat eller då är false så visas istället formuläret för att skapa konto. 
            */}
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
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    <label htmlFor="usernameCreateAccountInput">Username:</label>
                    {/*Här är ett input fält som samlar in den information som skrivs plus att vi uppdaterar userState med de som skrivs in. */}
                    <input 
                        id="usernameCreateAccountInput"
                        type="text"
                        placeholder="Enter your username..."
                        value={usernameInput} 
                        onChange={(e) => setUsernameInput(e.target.value)}
                        required
                    />

                    <label htmlFor="emailCreateAccountInput">Email:</label>
                    {/*Här är ett input fält som samlar in den information som skrivs plus att vi uppdaterar userState med de som skrivs in. */}
                    <input 
                        id="emailCreateAccountInput"
                        type="text"
                        placeholder="Enter your email address..."
                        value={emailInput} 
                        onChange={(e) => setEmailInput(e.target.value)} 
                        required
                    />
                
                    <label htmlFor="passwordCreateAccountInput">Password:</label>
                    {/*Här är ett input fält som samlar in den information som skrivs plus att vi uppdaterar userState med de som skrivs in. */}
                    <input 
                        className="passwordCreateAccountInput"
                        type="password"
                        placeholder="Enter your password..."
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required 
                    />

                    <label htmlFor="confirmPasswordAccountInput">Confirm password:</label>
                    {/*Här är ett input fält som samlar in den information som skrivs plus att vi uppdaterar userState med de som skrivs in. */}
                    <input
                        className="passwordCreateAccountInput"
                        type="password"
                        placeholder="Confirm your password..."
                        value={confirmPasswordInput}
                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        required
                    />

                    {/*Knapp med submit som en kopplat till <form> med hjälp av onSubmit därför viktigt med submit type på type på knappen*/}
                    <button type="submit">Create account</button>
                </form>  
            )}

                
        </div>
    )
}

export default CreateAccount;