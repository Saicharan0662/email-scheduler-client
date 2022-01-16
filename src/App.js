import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css'
import ActivateAccount from './pages/ActivateAccount';

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashbord" element={<Dashboard />} />
          <Route exact path="/confirmation/:token" element={<ActivateAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
