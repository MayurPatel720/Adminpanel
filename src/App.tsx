import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import AllFeed from "./components/AllFeed";
import AllQuiz from "./components/AllQuiz";
import AllService from "./components/AllService";
import AllGroups from "./components/Allgroups";
import EditQuiz from "./components/EditQuiz";
import EditGroups from "./components/Editgroups";
import Feed from "./components/Feed";
import Group from "./components/Group";
import Login from "./components/Login";
import Maincom from "./components/Maincom";
import Quiz2 from "./components/Quiz";
import ServiceCreate from "./components/ServiceCreate";
import ShowMarks from "./components/ShowMarks";
import Unauthorized from "./components/Unauthorized";

const queryClient = new QueryClient();

const Authority = {
  MANAGER: "MANAGER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
};

const authorityRoutesMap = {
  [Authority.MANAGER]: ["main", "login", "feedCreate", "feedAll"],
  [Authority.ADMIN]: [
    "main",
    "login",
    "feedCreate",
    "feedAll",
    "serviceCreate",
    "serviceAll",
  ],
  [Authority.SUPER_ADMIN]: [
    "main",
    "login",
    "feedCreate",
    "feedAll",
    "serviceCreate",
    "serviceAll",
    "quiz",
  ],
};

function App() {
  const authority = Authority.MANAGER;
  const allowedRoutes = authorityRoutesMap[authority] || [];

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/unauthorised" element={<Unauthorized />} />;
          {allowedRoutes.map((routeKey) => {
            switch (routeKey) {
              case "main":
                return <Route key={routeKey} path="/" element={<Maincom />} />;
              case "login":
                return (
                  <Route key={routeKey} path="/login" element={<Login />} />
                );
              case "feedCreate":
                return (
                  <Route
                    key={routeKey}
                    path="/Feed/Create"
                    element={<Feed />}
                  />
                );
              case "feedAll":
                return (
                  <Route
                    key={routeKey}
                    path="/Feed/all"
                    element={<AllFeed />}
                  />
                );
              case "serviceCreate":
                return (
                  <Route
                    key={routeKey}
                    path="/Service/create"
                    element={<ServiceCreate />}
                  />
                );
              case "serviceAll":
                return (
                  <Route
                    key={routeKey}
                    path="/Service/All"
                    element={<AllService />}
                  />
                );
              case "quiz":
                return (
                  <Route key={routeKey} path="/quiz" element={<Quiz2 />} />
                );
              case "allquiz":
                return (
                  <Route key={routeKey} path="/allquiz" element={<AllQuiz />} />
                );
              case "group":
                return (
                  <Route key={routeKey} path="/group" element={<Group />} />
                );
              case "allgroup":
                return (
                  <Route
                    key={routeKey}
                    path="/allgroup"
                    element={<AllGroups />}
                  />
                );
              case "editquiz":
                return (
                  <Route
                    key={routeKey}
                    path="/editquiz/:id"
                    element={<EditQuiz />}
                  />
                );
              case "editgroup":
                return (
                  <Route
                    key={routeKey}
                    path="/editgroup/:id"
                    element={<EditGroups />}
                  />
                );
              case "quizmarks":
                return (
                  <Route
                    key={routeKey}
                    path="/quizmarks"
                    element={<ShowMarks />}
                  />
                );
              // case "kao":
              //   return <Route key={routeKey} path="/kao" element={<Kao />} />;

              default:
                return null;
            }
          })}
          <Route path="*" element={<Navigate to="/unauthorised" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
