import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Kao from './components/Kao';
import Maincom from './components/Maincom';
import Quiz2 from './components/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Maincom />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/main" element={<Maincom />} /> */}
        <Route path="/kao" element={<Kao />} />
        <Route path="/quiz" element={<Quiz2 />} />
      </Routes>
    </Router>
  );
}

export default App;
