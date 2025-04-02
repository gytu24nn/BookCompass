import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import Layout from './components/Layout/Layout';
import Affärsplan from './components/menyval1Affärsplanen/Affärsplanen';
import Projektidé from './components/menyval2Projektidé/projektidé';
import Inspiration from './components/menyval3Insperation/Inspiration';

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
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
