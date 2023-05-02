import { useContext, useEffect } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainHeader from './components/MainHeader/MainHeader';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import AuthContext from './store/user-context';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreatePoll from './components/CreatePoll/CreatePoll';
import { useDispatch } from 'react-redux';
import { fetchPollData } from './store/polls-actions';
import UserDashboard from './components/UserDashboard/UserDashboard';
import UserPollForm from './components/UserPollForm/UserPollForm';
import ClosedPoll from './components/ClosedPoll/ClosedPoll';

function App() {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchPollData())
  }, [])
  return (
    <MainHeader>
      {authCtx.isLoggedIn ?
        <Routes>
          <Route path="/" element={<DashboardLayout>{authCtx.userData?.role === "Admin" ? <AdminDashboard /> : <UserDashboard />}</DashboardLayout>} />
          {authCtx.userData?.role === "Admin" &&
            <Route path="/adminDashboard" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />}
          {authCtx.userData?.role !== "Admin" &&
            <Route path="/userdashboard" element={<DashboardLayout><UserDashboard /></DashboardLayout>} />}
          {authCtx.userData?.role === "Admin" &&
            <Route path="/createnewpoll" element={<CreatePoll />} />}
          {authCtx.userData?.role === "Admin" &&
            <Route path="/openpoll/:pollId" element={<CreatePoll />} />}
          {authCtx.userData?.role === "Admin" &&
            <Route path="/closedpoll/:pollId" element={<ClosedPoll />} />}
          {authCtx.userData?.role !== "Admin" &&
            <Route path="/userpollform/:pollId" element={<UserPollForm />} />}
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
