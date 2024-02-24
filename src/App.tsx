
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Kao from "./components/Kao";
import Maincom from "./components/Maincom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quiz from "./components/Quiz";

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
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
