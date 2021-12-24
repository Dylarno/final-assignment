import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { NavLeft } from './components/nav-left'
import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { ProfilePage } from './components/pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className='App'>

        <NavLeft />

        <Switch>
        <Route path="/login">
            <LoginPage />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/me">
            <ProfilePage />
          </Route>

          
        </Switch>

      <div className="right-div" />
    </div>
      
    </Router>
  );
}

export default App;