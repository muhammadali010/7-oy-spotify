import React, {useEffect} from 'react'
import MainLayout from './layouts/MainLayout';
import { Route, Routes } from 'react-router-dom'
import Likes from "./pages/Likes"
import Home from "./pages/Home"
import Details from "./pages/Details"
import https from './axios'

function App() {  
  useEffect(() => {
  https.get('featured-playlists')
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  })
}, [])

  return (
    <div>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/likes' element={<Likes></Likes>}></Route>
          <Route path="/playlist/:id" element={<Details />} />
        </Routes>
      </MainLayout>
    </div>
  )
}

export default App
