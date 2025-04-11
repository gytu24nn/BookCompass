import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Layout from './components/Layout/Layout';
import Affärsplan from './components/menuOptions/menyval1Affärsplanen/Affärsplanen';
import CreateAccount from "./components/CreateAccount/CreateAccount";
import LogIn from "./components/LogIn/LogIn";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<h2 className="homePageHeader">Welcome to BookCompass</h2>} />
              <Route path='affärsplan' element={<Affärsplan />} />
              <Route path="create-account" element={<CreateAccount />} />
              <Route path="login" element={<LogIn />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
