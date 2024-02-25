import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Kao from "./components/Kao";
import Maincom from "./components/Maincom";
import Quiz2 from "./components/Quiz";
import Feed from "./components/Feed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeleteFeed from "./components/DeleteFeed";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Maincom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Feed/Create" element={<Feed />} />
          <Route path="/Feed/delete" element={<DeleteFeed />} />
          <Route path="/kao" element={<Kao />} />
          <Route path="/quiz" element={<Quiz2 />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
