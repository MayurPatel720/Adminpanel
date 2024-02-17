import "../css/Sidebar.css";
import { PanelMenu } from 'primereact/panelmenu';
import { MenuItem } from 'primereact/menuitem';
import { useNavigate } from "react-router-dom";

export default function BasicDemo() {
    const navigate = useNavigate();
    const items: MenuItem[] = [
        {
            label: 'Quiz',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'Make New Quiz',
                    icon: 'pi pi-file',
                    url: '/kao',
                    // items: [
                    //     {
                    //         label: 'Clients',
                    //         icon: 'pi pi-users',
                    //         url: '/kao',
                    //     }
                    // ]
                },
                {
                    label: 'See Past Quizes',
                    icon: 'pi pi-image',
                    items: [
                        {
                            label: 'Month',
                            icon: 'pi pi-image'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Feed',
            icon: 'pi pi-cloud',
            items: [
                {
                    label: 'Post',
                    icon: 'pi pi-cloud-upload'
                },
                {
                    label: 'Delete',
                    icon: "pi pi-times"
                },
                {
                    label: 'Sync',
                    icon: 'pi pi-refresh'
                }
            ]
        },
        {
            label: 'Pushp',
            icon: 'pi pi-desktop',
            items: [
                {
                    label: 'Purple',
                    icon: 'pi pi-mobile'
                },
                {
                    label: 'Saffron',
                    icon: 'pi pi-desktop'
                },
                {
                    label: 'Magenta',
                    icon: 'pi pi-tablet'
                }
            ]
        }
    ];

//  url: 'https://primereact.org' 

    return (
        <div className="card">
         <PanelMenu onClick={() => {
                const clickedItem = items[0];
                console.log(clickedItem.url);
            }} model={items} className="w-full md:w-18rem" />
        </div>
    );
}
