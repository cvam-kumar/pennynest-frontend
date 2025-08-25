import React, {useContext, useEffect} from 'react';
import AppContext from "../context/AppContext.jsx";
import {User} from "lucide-react";
import {SIDE_BAR_DATA} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const Sidebar = ({activeMenu}) => {

    const {user, openSideMenu} = useContext(AppContext);
    const navigate = useNavigate();
    // const isOpen = openSideMenu;

    // useEffect(() => {
    //     document.body.classList.toggle("overflow-hidden", isOpen);
    //     return () => document.body.classList.remove("overflow-hidden");
    // }, [isOpen])

    // if(!isOpen) return null;

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-blue-100 border-gray-200 p-5 fixed top-[61px] z-20 ">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img className="rounded-full w-20 h-20 bg-slate-400" src={user?.profileImageUrl || ""} alt="profile image"  />
                ) : (
                    <User className="w-20 h-20 text-xl" />
                )}
                <h5 className="font-medium text-blue-500 leading-6">{user?.fullName}</h5>
            </div>

            {SIDE_BAR_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    onClick={() => navigate(item.path)}
                    className={
                        `cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors duration-200 ${
                            activeMenu === item.label
                                ? 'bg-blue-300 text-black font-semibold'
                                : ''
                        }`
                    }
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}

        </div>
    );
};

export default Sidebar;