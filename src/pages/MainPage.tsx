import { NavBar } from '../components/NavBar'
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AuthProvider from '../context/AuthProvider';
import Loginpage from './Loginpage';
import AccountPage from './AccountPage';
import SignUpPage from './SignUpPage';
import ProtectedRoute from '../components/ProtectedRoute';

const MainPage = () => {
  return (
    <>
    <AuthProvider>
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/login" element={<Loginpage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/account" element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          
          }/>

      </Routes>
    </AuthProvider>
    </>
  )
}

export default MainPage