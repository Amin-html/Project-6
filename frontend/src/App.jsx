import { BrowserRouter, Routes, Route } from 'react-router-dom'  
import Navbar from './components/Navbar'  
import ProductList from './pages/ProductList'  
import ProductDetail from './pages/ProductDetail'  
import Cart from './pages/Cart'  

function App() {  
  return (  
    <BrowserRouter>  
      <Navbar />  
      <Routes>  
        <Route path="/" element={<ProductList />} />  
        <Route path="/products/:id" element={<ProductDetail />} />  
        <Route path="/cart" element={<Cart />} />  
      </Routes>  
    </BrowserRouter>  
  )  
}  

export default App
