import './App.css'
import {Route, BrowserRouter as Routers, Routes } from"react-router-dom"
import Header from './component/layout/Header'
import Home from './component/pages/Home'
import Insert from './component/pages/Insert'
import Update from './component/pages/Update'
import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Routers>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>} ></Route>
          <Route path='/insert' element={<Insert></Insert>} ></Route>
          <Route path='/update/:id' element={<Update></Update>} ></Route>
        </Routes>
      </Routers>
      <Toaster></Toaster>
    </>
  )
}

export default App
