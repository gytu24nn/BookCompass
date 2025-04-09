import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";  // Importera useLocation

const Layout = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();  // Hämta location från useLocation

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user);  // Uppdatera loggedInUser när vi får location ändring
  }, [location]);  // Uppdatera när location ändras

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");  // Navigera till startsidan efter logout
  };

  return (
    <div id="wrapper">
      <header>
        <h1 id="headerFont">
          <i className="fa-solid fa-book"></i>BookCompass
        </h1>
        <nav id="menyOptions">
          <Link className="menuOption" to="/">
            <i className="fa-solid fa-house"></i>Home
          </Link>
          <Link className="menuOption" to="/affärsplan">
            <i className="fa-solid fa-coins"></i>Affärsplan
          </Link>
          <Link className="menuOption" to="/projektidé">
            <i className="fa-solid fa-lightbulb"></i>Projektidé
          </Link>
          <Link className="menuOption" to="/inspiration">
            <i className="fa-solid fa-paintbrush"></i>Inspiration
          </Link>

          {/* Visa alternativ beroende på om användaren är inloggad eller inte */}
          {loggedInUser ? (
            <>
              <button className="menuOption" onClick={handleLogout}>
                Logout
              </button>
              <span>Välkommen, {loggedInUser}!</span>
            </>
          ) : (
            <>
              <Link className="menuOption" to="/create-account">
                Skapa konto
              </Link>
              <Link className="menuOption" to="/login">
                Logga in
              </Link>
            </>
          )}
        </nav>
      </header>

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
