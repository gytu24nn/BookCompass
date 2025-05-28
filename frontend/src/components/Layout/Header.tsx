import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation} from "react-router-dom"
import { useUser } from "../Context/UserContext";

const Header = () => {
    //state som håller reda på om en användare är inloggad kollas vad de finns för data i localstorage.
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const {userName, setUserName} = useUser();
    const navigate = useNavigate(); //för att kunna programmera navigering
    const location = useLocation();  // Hämtar aktuell url i appen.

    //Denna useEffect körs varje gång användaren byter sida för att se så att den visar rätt menyval. 
    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        setLoggedInUser(user);  // Uppdatera loggedInUser när vi får location ändring
    }, [location]);  // Uppdatera när location ändras

    // Funktion för att logga ut användaren. 
    const handleLogout = () => {
        localStorage.removeItem("token"); //Ta bort token från localstorage.
        setLoggedInUser(null); // Uppdaterar loggedInUser userState till null för att visa rätt meny val. 
        navigate("/");  // Navigera till startsidan efter ut loggning. 
    };

    return( 
        <>
            <header>
            {/*sidhuvud med navigeringsmeny*/}
            <h1 id="headerFont">
                <i className="fa-solid fa-book"></i>BookCompass
            </h1>
            {/*Navigerings meny med länkar med router.*/}
            <nav id="menyOptions">
                <Link className="menuOption" to="/">
                    <i className="fa-solid fa-house"></i>Home
                </Link>
                <Link className="menuOption" to="/MyLibrary">
                    <i className="fa-solid fa-bookmark"></i>My Library
                </Link>

                {/* Visa alternativ beroende på om användaren är inloggad eller inte */}
                {userName ? (
                    <>
                        {/*Logga ut knapp och hälsning visas tillsammans med meny val om användaren är inloggad.*/}
                        <button className="menuOption" onClick={handleLogout}>
                            <i className="fa-solid fa-user"></i>Logout
                        </button>
                        <span>Welcome, {userName}!</span>
                    </>
                ) : (
                    <>
                        {/*Länkar till skapa konto och logga in visas om användaren inte är inloggad*/}
                        <Link className="menuOption" to="/create-account">
                            <i className="fa-solid fa-user"></i>Sign up
                        </Link>
                        <Link className="menuOption" to="/login">
                            <i className="fa-solid fa-user"></i>Sign in
                        </Link>
                    </>
                )}
            </nav>
            </header>    
        </>
    )
}

export default Header;