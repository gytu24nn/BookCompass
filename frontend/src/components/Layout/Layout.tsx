import { Outlet } from "react-router-dom";  // Importera useLocation
import Footer from "./footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div id="wrapper">
      
      <header>
        <Header />
      </header>

      {/*Här visas innehållet för den sida användaren har valt med hjälp av outlet.*/}
      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;