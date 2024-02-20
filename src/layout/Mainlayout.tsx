import React, { ReactNode } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import "../css/Mainlayout.css"; // Import your CSS file for styling

interface MyLayoutProps {
  children: ReactNode;
}

const MyLayout: React.FC<MyLayoutProps> = ({ children }) => {
  return (
    <div className="my-layout-container">
      <Nav />
      <div className="middle">
        <Sidebar />
        <main className="my-layout-main">{children}</main>
      </div>
    </div>
  );
};

export default MyLayout;
