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
          command: () => navigate("/AllQuiz"),
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
          command: () => navigate("/Feed"),
        },
        {
          label: "Delete",
          icon: "pi pi-times",
        },
        {
          label: "Sync",
          icon: "pi pi-refresh",
        },
      ],
    },
    {
      label: "Pushp",
      icon: "pi pi-desktop",
      items: [
        {
          label: "Purple",
          icon: "pi pi-mobile",
        },
        {
          label: "Saffron",
          icon: "pi pi-desktop",
        },
        {
          label: "Magenta",
          icon: "pi pi-tablet",
        },
      ],
    },
  ];

  return (
    <div className="card">
      <PanelMenu model={items} className="w-full md:w-18rem" />
    </div>
  );
}
