import React from 'react'
import Sidebar from '../Components/Sidebar'
import {Routes,Route} from "react-router-dom"
import Listproduct from '../Components/Listproduct'
import Addproduct from '../Components/Addproduct'

const Admin = () => {
  return (
    <div className='lg:flex'>
        <Sidebar />
        <Routes>
            <Route path='/addproduct' element={<Addproduct />}/>
            <Route path='/listproduct' element={<Listproduct />}/>
            <Route path='/addproduct'/>
        </Routes>
    </div>
  )
}

export default Admin
