import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Kao from "./components/Kao";
import Maincom from "./components/Maincom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quiz from "./components/Quiz";
import AllQuiz from "./components/AllQuiz";
import EditQuiz from "./components/EditQuiz";
import ShowMarks from "./components/ShowMarks";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Maincom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allquiz" element={<AllQuiz />} />
          <Route path="/editquiz/:id" element={<EditQuiz />} />
          <Route path="/quizmarks" element={<ShowMarks />} />
          <Route path="/kao" element={<Kao />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
