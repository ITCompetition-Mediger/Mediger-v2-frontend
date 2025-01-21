import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup" Component={SignupPage} />
      </Routes>
    </Router>
  );
};

export default App;
