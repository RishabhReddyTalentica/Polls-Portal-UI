import { useContext } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainHeader from './components/MainHeader/MainHeader';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import AuthContext from './store/user-context';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <MainHeader>
      {authCtx.isLoggedIn ?
        <Routes>
          <Route path="/" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
          <Route path="/adminDashboard" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to='/' replace />} />
        </Routes>
      }

    </MainHeader>
  );
}

export default App;
