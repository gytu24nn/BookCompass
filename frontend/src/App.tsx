import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Layout from './components/Layout/Layout';
import Affärsplan from './components/menyval1Affärsplanen/Affärsplanen';
import Projektidé from './components/menyval2Projektidé/projektidé';
import Inspiration from './components/menyval3Insperation/Inspiration';
import CreateAccount from "./components/CreateAccount/CreateAccount";
import LogIn from "./components/LogIn/LogIn";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<h3>Welcome to BookCompass</h3>} />
              <Route path='affärsplan' element={<Affärsplan />} />
              <Route path='projektidé' element={<Projektidé />} />
              <Route path='inspiration' element={<Inspiration />} />
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
