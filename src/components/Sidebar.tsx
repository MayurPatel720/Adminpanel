import "../css/Sidebar.css";
import { PanelMenu } from "primereact/panelmenu";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

export default function BasicDemo() {
 

  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      label: "Quiz",
      icon: "pi pi-file",
      items: [
        {
          label: "Make New Quiz",
          icon: "pi pi-file",
          command: () => navigate("/Quiz"),
        },
        {
          label: "See Past Quizes",
          icon: "pi pi-image",
          items: [
            {
              label: "Month",
              icon: "pi pi-image",
            },
          ],
        },
      ],
    },
    {
      label: "Feed",
      icon: "pi pi-cloud",
      items: [
        {
          label: "Create Post",
          icon: "pi pi-cloud-upload",
          command: () => navigate("/Feed/Create"),
        },
        {
          label: "All Posts",
          icon: "pi pi-times",
          command: () => navigate("/Feed/all"),
        },
      ],
    },
    
    {
      label: "Prepaid Service",
      icon: "pi pi-desktop",
      items: [
        {
          label: "Create",
          icon: "pi pi-plus",	
          command: () => navigate("/Service/create"),
        },
        {
          label: "All Service",
          icon: "pi pi-desktop",
          command: () => navigate("/Service/All"),
        }
      ],
    },
  ];

  return (
    <div className="card">
      <PanelMenu model={items} className="w-full md:w-18rem" />
    </div>
  );
}

