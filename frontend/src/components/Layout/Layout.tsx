import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";  // Importera useLocation

const Layout = () => {
  //state som håller reda på om en användare är inloggad kollas vad de finns för data i localstorage.
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const navigate = useNavigate(); //för att kunna programmera navigering
  const location = useLocation();  // Hämtar aktuell url i appen.

  //Denna useEffect körs varje gång användaren byter sida för att se så att den visar rätt menyval. 
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);  // Uppdatera loggedInUser när vi får location ändring
  }, [location]);  // Uppdatera när location ändras

  // Funktion för att logga ut användaren. 
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); //Ta bort användarinfo från localstorage.
    localStorage.removeItem("token"); //Ta bort token från localstorage.
    setLoggedInUser(null); // Uppdaterar loggedInUser userState till null för att visa rätt meny val. 
    navigate("/");  // Navigera till startsidan efter ut loggning. 
  };

  return (
    <div id="wrapper">
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
            <i className="fa-solid fa-coins"></i>My Library
          </Link>

          {/* Visa alternativ beroende på om användaren är inloggad eller inte */}
          {loggedInUser ? (
            <>
              {/*Logga ut knapp och hälsning visas tillsammans med meny val om användaren är inloggad.*/}
              <button className="menuOption" onClick={handleLogout}>
                <i className="fa-solid fa-user"></i>Logout
              </button>
              <span>Välkommen, {loggedInUser}!</span>
            </>
          ) : (
            <>
              {/*Länkar till skapa konto och logga in visas om användaren inte är inloggad*/}
              <Link className="menuOption" to="/create-account">
                <i className="fa-solid fa-user"></i>Skapa konto
              </Link>
              <Link className="menuOption" to="/login">
                <i className="fa-solid fa-user"></i>Logga in
              </Link>
            </>
          )}
        </nav>
      </header>

      {/*Här visas innehållet för den sida användaren har valt med hjälp av outlet.*/}
      <main>
        <Outlet />
      </main>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h2>Kontakt</h2>
            <p>
              Info@BookCompass.se <br />
              +46 1234567 <br />
              Järnvägsgatan 5 <br />
              331 31 Värnamo <br />
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 BookCompass</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
