import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Layout from './components/Layout/Layout';
import MyLibrary from './components/menuOptions/myLibrary';
import CreateAccount from "./components/CreateAccount/CreateAccount";
import LogIn from "./components/LogIn/LogIn";
import HomePage from "./components/menuOptions/homePageFolder/Home-page";
import BookDetailPage from "./components/menuOptions/BookDetail-page";
import ErrorBoundaryFallBack from "./components/ErrorBoundryFallback";
import { ErrorBoundary } from "react-error-boundary";
import { UserProvider } from "./components/Context/UserContext";

function App() {
  return (
    <UserProvider>        {/*här använder jag mig av router för att jag ska kunna ha en meny som användaren kan välja mellan.*/}
        <Router>
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallBack}>
            <Routes>
            
              {/*All routing ligger i layout komponenten den fungerar som en mall med header, main och header.*/}
              <Route path='/' element={<Layout />}>

                {/*Startsida: visas när använder går till /*/}
                <Route index element={<HomePage />} /> 

                {/*sida för affärsplanen visas när man går till /affärsplan (kommer bytas ut senare till något annat passande för bookcompass)*/}
                <Route path='myLibrary' element={<MyLibrary />} />

                {/*Sida för skapa konto visas när man går till /create-account*/}
                <Route path="create-account" element={<CreateAccount />} />

                {/*Sida för att logga in visas när man går till /login*/}
                <Route path="login" element={<LogIn />} />

                <Route path="books/:id" element={<BookDetailPage />} />
              
              </Route>
            </Routes>
          </ErrorBoundary>
        </Router>
    </UserProvider>
  )
}

export default App
