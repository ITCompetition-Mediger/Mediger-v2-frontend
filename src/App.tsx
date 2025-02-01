import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage.tsx';
import PersonalSignupPage from './pages/PersonalSignupPage.tsx';
import PersonalSignupDetailsPage from './pages/PersonalSignupDetailsPage.tsx';
import BusinessSignupPage from './pages/BusinessSignupPage.tsx';
import BusinessSignupDetailsPage from './pages/BusinessSignupDetailsPage.tsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/signup/personal" Component={PersonalSignupPage} />
        <Route path="/signup/personal/details" Component={PersonalSignupDetailsPage} />
        <Route path="/signup/business" Component={BusinessSignupPage} />
        <Route path="/signup/business/details" Component={BusinessSignupDetailsPage} />
      </Routes>
    </Router>
  );
};

export default App;
