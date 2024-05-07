// import "../css/Sidebar.css";
// import { PanelMenu } from "primereact/panelmenu";
// import { MenuItem } from "primereact/menuitem";
// import { useNavigate } from "react-router-dom";

// export default function BasicDemo() {
//   const Authority = {
//     MANAGER: "MANAGER",
//     ADMIN: "ADMIN",
//     SUPER_ADMIN: "SUPER_ADMIN",
//   };
//   const authority = Authority.MANAGER;
//   const navigate = useNavigate();

//   let items: MenuItem[] = [];

//   switch (authority) {
//     case Authority.ADMIN:
//       items = [
//         {
//           label: "Quiz",
//           icon: "pi pi-file",
//           items: [
//             {
//               label: "Make New Quiz",
//               icon: "pi pi-file",
//               command: () => navigate("/Quiz"),
//             },
//             {
//               label: "See Past Quizes",
//               icon: "pi pi-image",
//               items: [
//                 {
//                   label: "Month",
//                   icon: "pi pi-image",
//                 },
//               ],
//             },
//           ],
//         },
//       ];
//       break;
//     case Authority.MANAGER:
//       {

//         items = [
//           {
//             label: "Prepaid Service",
//             icon: "pi pi-desktop",
//             items: [
//               {
//                 label: "Create",
//                 icon: "pi pi-plus",
//               command: () => navigate("/Service/create"),
//             },
//             {
//               label: "All Service",
//               icon: "pi pi-desktop",
//               command: () => navigate("/Service/All"),
//             },
//           ],
//         },
//       ];
//       break;
//     }
//     case Authority.SUPER_ADMIN:
//       break;
//     default:
//       break;
//   }

//   return (
//     <div className="card">
//       <PanelMenu model={items} className="w-full md:w-18rem" />
//     </div>
//   );
// }

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

