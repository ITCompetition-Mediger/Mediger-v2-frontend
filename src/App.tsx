import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LoginPage} />
      </Routes>
    </Router>
  );
};

export default App;
