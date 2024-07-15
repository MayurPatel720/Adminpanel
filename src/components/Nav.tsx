import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Nav.css";

interface Item {
  label: string;
  icon: string;
  badge?: number;
  shortcut?: string;
  template?: (item: MenuItem) => JSX.Element;
  items?: Item[];
  separator?: boolean;
  command?: () => void;
}

const TemplateDemo: React.FC = () => {
  const navigate = useNavigate();
  const [visiblesidebar,notvisiblesidebar] = useState(false);

  const itemRenderer = (item: MenuItem) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
    </a>
  );

  const items: Item[] = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    // {
    //   label: "Features",
    //   icon: "pi pi-star",
    // },
    // {
    //   label: "Projects",
    //   icon: "pi pi-search",
    //   items: [
    //     {
    //       label: "Core",
    //       icon: "pi pi-bolt",
    //       shortcut: "⌘+S",
    //       template: itemRenderer,
    //     },
    //     {
    //       label: "Blocks",
    //       icon: "pi pi-server",
    //       shortcut: "⌘+B",
    //       template: itemRenderer,
    //     },
    //     {
    //       label: "UI Kit",
    //       icon: "pi pi-pencil",
    //       shortcut: "⌘+U",
    //       template: itemRenderer,
    //     },
    //     {
    //       label: "Templates",
    //       icon: "pi pi-palette",
    //       items: [
    //         {
    //           label: "Apollo",
    //           icon: "pi pi-palette",
    //           badge: 2,
    //           template: itemRenderer,
    //         },
    //         {
    //           label: "Ultima",
    //           icon: "pi pi-palette",
    //           badge: 3,
    //           template: itemRenderer,
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];

  const start = (
    <img
      onClick={() => {
        navigate("/");
      }}
      alt="logo"
      style={{ marginLeft: "25px" }}
      src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Baps_logo.svg/1200px-Baps_logo.svg.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      {/* <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      /> */}
      <Avatar
        onClick={() => {
          navigate("/login");
        }}
        image="https://cdn-icons-png.freepik.com/256/747/747376.png?ga=GA1.1.891391406.1713304355&semt=ais_hybrid"
        shape="circle"
      />
      <div className="as">
      <Avatar className="hamburger"
        onClick={() => {
          
          
        }}
        image="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/30-512.png"
        shape="circle"
      />
      </div>
    </div>
  );

  return (
    <>
    <div className="card" style={{ padding: "0px" }}>
      <Menubar style={{width: "100%"}} model={items} start={start} end={end} />
    </div>
      </>
  );
};

export default TemplateDemo;
