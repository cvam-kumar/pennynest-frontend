import React, {useContext, useEffect} from 'react';
import AppContext from "../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";
import {LogOut, Menu, User, X} from "lucide-react";
import {assets} from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";

const Menubar = () => {
    
    const [showDropDown, setShowDropDown] = React.useState(false);
    const dropdownRef = React.useRef(null);

    const {user,openSideMenu, setOpenSideMenu, clearUser} = useContext(AppContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropDown(false);
        navigate("/login");
    }
useEffect(() => {
    const handleClickOutside = (event) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropDown(false);
        }
    }
    if(showDropDown){
        document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }

}, [showDropDown]);

    return (
        <nav
            className="flex fixed items-center justify-between gap-5 bg-white border border-b border-gray-200 backdrop-blur-sm top-0 left-0 w-full z-50 py-2 px-5">
            {/*left side - Menu button and title*/}
            <div className="flex items-center gap-5">
                <button
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-black hover:bg-gray-200 p-1 rounded transition-colors">
                    {openSideMenu ? <X className="text-2xl"/> : <Menu className="text-2xl"/>}
                </button>
                <div className="flex items-center gap-2">
                    <img src={assets.logo} alt="logo" className="h-7 w-8 rounded-md"/>
                    <span className="text-lg font-medium text-blue-600 truncate">PennyNest</span>
                </div>
            </div>


            {/*right side - Avatar Photo*/}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowDropDown(!showDropDown)}
                    className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-400 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2">
                    <User className="text-blue-600 hover:text-white"/>
                </button>

                {showDropDown && (
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        {/*user info*/}
                        <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                    <User className="w-4 h-4 text-blue-600"/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-blue-800 truncate">{user.fullName}</p>
                                    <p className="text-xs text-blue-500 truncate">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        {/*Drop Options */}
                        <div className="py-1">
                            <button onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-7 py-2 text-sm text-blue-500 hover:bg-blue-150 transition-colors duration-150 cursor-pointer">
                                <LogOut className="w-4 h-4 text-blue-600"/>
                                <span className="px-1">Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/*Mobile Side - Menu*/}
            {
                openSideMenu && (
                    <div className='fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-50 top-[73px]'>
                        <Sidebar/></div>
                )
            }
        </nav>
    );
};

export default Menubar;


