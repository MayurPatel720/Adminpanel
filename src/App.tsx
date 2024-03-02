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
import { Toast } from "primereact/toast";
import { useContext, useRef, createContext } from "react";
// import { createContext } from "vm";

const queryClient = new QueryClient();

export const ToastContext = createContext<any>(undefined);

export const useToast = () => {
  const toastContext = useContext(ToastContext);
  return toastContext;
};

function ToastContextProvider({ children }: any) {
  const toast = useRef<Toast | null>(null);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toast ref={toast}></Toast>
    </ToastContext.Provider>
  );
}

function App() {
  return (
    <ToastContextProvider>
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
    </ToastContextProvider>
  );
}

export default App;
