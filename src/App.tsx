import { Component } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainHeader from './components/MainHeader/MainHeader';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import AuthContext from './store/user-context';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreatePoll from './components/CreatePoll/CreatePoll';
import { connect } from 'react-redux';
import { fetchPollData } from './store/polls-actions';
import UserDashboard from './components/UserDashboard/UserDashboard';
import UserPollForm from './components/UserPollForm/UserPollForm';
import ClosedPoll from './components/ClosedPoll/ClosedPoll';
import { ThunkDispatch } from "redux-thunk";
import { RootState } from './store/store';

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => ({
  fetchPollData: () => {
    dispatch(fetchPollData());
  },
});

const mapStateToProps = (state: RootState) => ({
  storePolls: state.polls.polls
});

class App extends Component<any, any>{
  static contextType: React.Context<any> = AuthContext;
  context!: React.ContextType<typeof AuthContext>;
  routes: any[] = [];
  componentDidMount() {
    this.props.fetchPollData();
  }
  render() {
    this.routes = this.context.isLoggedIn ?
      this.context.userData?.role === "Admin" ?
        [
          { path: "/", component: <DashboardLayout><AdminDashboard /></DashboardLayout> },
          { path: "/admindashboard", component: <DashboardLayout><AdminDashboard /></DashboardLayout> },
          { path: "/createnewpoll", component: <CreatePoll /> },
          { path: "/openpoll/:pollId", component: <CreatePoll /> },
          { path: "/closedpoll/:pollId", component: <ClosedPoll /> },
          { path: "*", component: <Navigate to='/' replace /> },

        ]
        :
        [
          { path: "/", component: <DashboardLayout><UserDashboard /></DashboardLayout> },
          { path: "/userdashboard", component: <DashboardLayout><UserDashboard /></DashboardLayout> },
          { path: "/userpollform/:pollId", component: <UserPollForm /> },
          { path: "*", component: <Navigate to='/' replace /> },
        ]
      :
      [
        { path: "/", component: <LoginPage /> },
        { path: "/login", component: <LoginPage /> },
        { path: "/signup", component: <SignUpPage /> },
        { path: "*", component: <Navigate to='/' replace /> },
      ]
    return (
      <MainHeader>
        <Routes>
          {this.routes.map((route, index) => {
            return (<Route key={index} path={route.path} element={route.component} />)
          })}
        </Routes>

      </MainHeader>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
