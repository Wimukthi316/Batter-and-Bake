import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/user/Home'
import Feed from './pages/user/Feed'
import Navbar from './components/user/Navbar'
import Profile from './pages/user/Profile'
import Network from './pages/user/Network'

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

function AppContent() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };


  return (
    <>
      <Navbar onNavigate={handleNavigation} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/network" element={<Network />} />
      </Routes>
    </>
  )
}

export default App