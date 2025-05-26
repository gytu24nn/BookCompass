import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoadingSpinner from "./LoadingSpinner";

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

        if(passwordInput !== confirmPasswordInput) {
            setErrorMessage("passwords do not match! Try again");
            return;
        }

        // Kontrollera att e-postadressen har ett giltigt format: [något]@[något].[något]
        // Exempelvis: test@example.com – annars visas ett felmeddelande.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(emailInput)) {
            setErrorMessage("Invalid email format! try again");
            return;
        }

        if(passwordInput.length < 6) {
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
                <LoadingSpinner />   
            ) : (
               <SignupForm 
                    username={usernameInput}
                    email={emailInput}
                    password={passwordInput}
                    confirmPassword={confirmPasswordInput}
                    onUsernameChange={(e) => setUsernameInput(e.target.value)}
                    onEmailChange={(e) => setEmailInput(e.target.value)}
                    onPasswordChange={(e) => setPasswordInput(e.target.value)}
                    onConfirmPasswordChange={(e) => setConfirmPasswordInput(e.target.value)}
                    onSubmit={handleCreateAccount}
                    errorMessage={errorMessage}
               />
            )}

                
        </div>
    )
}

export default CreateAccount;