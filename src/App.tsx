<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Kao from './components/Kao';
import Maincom from './components/Maincom';
import Quiz2 from './components/Quiz';
import Feed from './components/Feed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Maincom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Feed" element={<Feed />} />

        <Route path="/kao" element={<Kao />} />
        <Route path="/quiz" element={<Quiz2 />} />
      </Routes>
    </Router>
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Kao from "./components/Kao";
import Maincom from "./components/Maincom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Maincom />} />
          <Route path="/kao" element={<Kao />} />
        </Routes>
      </Router>
    </QueryClientProvider>
>>>>>>> 6526f81cc46f2f2d388ce3e940f7b004a3f009f3
  );
}

export default App;
