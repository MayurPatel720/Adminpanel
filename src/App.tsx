// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
// import Login from "./components/Login";
// import ServiceCreate from "./components/ServiceCreate";
// import Maincom from "./components/Maincom";
// import Quiz2 from "./components/Quiz";
// import Feed from "./components/Feed";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import AllFeed from "./components/AllFeed";
// import AllService from "./components/AllService";

// const queryClient = new QueryClient();

// function App() {
//   const authority = "MANAGER  ";
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <Routes>
//             <Route path="/" element={<Maincom />} />
//             <Route path="/login" element={<Login />} />

//             <Route path="/Feed/Create" element={<Feed />} />
//             <Route path="/Feed/all" element={<AllFeed />} />
//             <Route path="/Service/create" element={<ServiceCreate />} />
//             <Route path="/Service/All" element={<AllService />} />
//             <Route path="/quiz" element={<Quiz2 />} />
//         </Routes>
//       </Router>
//     </QueryClientProvider>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ServiceCreate from "./components/ServiceCreate";
import Maincom from "./components/Maincom";
import Quiz2 from "./components/Quiz";
import Feed from "./components/Feed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllFeed from "./components/AllFeed";
import AllService from "./components/AllService";
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
