import {Routes,Route} from 'react-router-dom'
import './App.css'
import Register from './components/register'
import Login from './components/Login'
import Header from './components/header'
import Products from './components/Products'

function App() {
  return (
    <div className='App'>
   <Header />
   <Routes>
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/products" element={<Products/>}/>
   </Routes>
   </div>
  )
}

export default App
