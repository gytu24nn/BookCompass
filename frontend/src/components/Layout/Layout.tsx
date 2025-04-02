import { Outlet, Link } from "react-router-dom"

const Layout = () => {
    return(
        <>
            <div>
                <header>
                    <div>
                        <h1>BookCompass</h1>
                    </div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/affärsplan">Affärsplan</Link>
                        <Link to="/projektidé">Projektidé</Link>
                        <Link to="/inspiration">Inspiration</Link>
                    </nav>
                </header>

                <div>
                    <main>
                        <Outlet />
                    </main>
                </div>

                <div>
                    <footer>
                        <p>© 2025 BookCompass</p>
                    </footer>
                </div>


            </div>
        </>
    )
}

export default Layout;