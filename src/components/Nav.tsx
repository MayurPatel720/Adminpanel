import React from 'react';
import "../css/Nav.css";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';  

interface Item {
    label: string;
    icon: string;
    badge?: number;
    shortcut?: string;
    template?: (item: MenuItem) => JSX.Element;
    items?: Item[];
    separator?: boolean;
}

const TemplateDemo: React.FC = () => {
    const itemRenderer = (item: MenuItem) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>

        </a>
    );

    const items: Item[] = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    shortcut: '⌘+S',
                    template: itemRenderer
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    shortcut: '⌘+B',
                    template: itemRenderer
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    shortcut: '⌘+U',
                    template: itemRenderer
                },
                // {
                //     separator: true
                // },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette',
                            badge: 2,
                            template: itemRenderer
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            badge: 3,
                            template: itemRenderer
                        }
                    ]
                }
            ]
        },
        
    ];

    const start = <img alt="logo" style={{marginLeft:"25px"}} src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Baps_logo.svg/1200px-Baps_logo.svg.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
        <div className="card" style={{padding:"0px"}}>
            <Menubar model={items} start={start} end={end} />
        </div>
    );
};

export default TemplateDemo;
