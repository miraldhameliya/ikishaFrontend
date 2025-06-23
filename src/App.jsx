import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Diamond from './pages/Diamond';
import Category from './pages/Category';
import Header from './components/Header';
import { HeaderRightButtonProvider } from './contexts/HeaderRightButtonContext';
import DiamondClarity from './pages/DiamondClarity';
import Metal from './pages/Metal';
import Size from './pages/Size';
import { useState } from 'react';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct';

const routeList = [
  { name: 'Category', path: '/category' },
  { name: 'Product', path: '/product' },
  { name: 'Diamond', path: '/diamond' },
  { name: 'Diamond-Clarity', path: '/diamond-clarity' },
  { name: 'Metal', path: '/metal' },
  { name: 'Size', path: '/size' },
  // add more as needed
];

function AppContent() {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/forgot-password', '/reset-password'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <HeaderRightButtonProvider>
      {!shouldHideHeader && <Header routeList={routeList} />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/category" element={<Category />} />
        <Route path="/diamond" element={<Diamond />} />
        <Route path='/product' element={<Product />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/diamond-clarity' element={<DiamondClarity />} />
        <Route path='/metal' element={<Metal />} />
        <Route path='/size' element={<Size />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </HeaderRightButtonProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
