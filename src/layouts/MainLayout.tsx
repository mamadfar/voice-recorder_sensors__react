import {FC, ReactNode} from 'react';
import {NavLink} from "react-router-dom";

const MainLayout:FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className="p-4">
            <nav className="flex justify-center gap-8 mb-8">
                <NavLink to='/recorder'
                         className={({isActive}) => `border rounded-lg px-8 py-2 ${isActive ? 'shadow-sm' : 'shadow-xl'}`}>Recorder</NavLink>
                <NavLink to='/sensors'
                         className={({isActive}) => `border rounded-lg px-8 py-2 ${isActive ? 'shadow-sm' : 'shadow-xl'}`}>Sensors</NavLink>
            </nav>
            <main className="flex justify-center">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
