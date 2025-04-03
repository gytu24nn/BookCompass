import { Outlet, Link } from "react-router-dom"

const Layout = () => {
    return(
        <>
            <div>
                <header>
                    <h1 id="headerFont"><i className="fa-solid fa-book"></i>BookCompass</h1>
                    <nav id="menyOptions">
                        <Link className="menuOption" to="/"><i className="fa-solid fa-house"></i>Home</Link>
                        <Link className="menuOption" to="/affärsplan"><i className="fa-solid fa-coins"></i>Affärsplan</Link>
                        <Link className="menuOption" to="/projektidé"><i className="fa-solid fa-lightbulb"></i>Projektidé</Link>
                        <Link className="menuOption" to="/inspiration"><i className="fa-solid fa-paintbrush"></i>Inspiration</Link>
                    </nav>
                </header>

                <div>
                    <main>
                        <Outlet />
                    </main>
                </div>

                <div>
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

            </div>
        </>
    )
}

export default Layout;