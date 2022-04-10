import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css'
import ActivateAccount from './pages/ActivateAccount';
import ForgetPassword from './pages/ForgetPassword';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/confirmation/:token" element={<ActivateAccount />} />
          <Route exact path='/reset-password/:token' element={<ForgetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
