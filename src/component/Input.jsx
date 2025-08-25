import React from 'react';
import {EyeIcon, EyeOff} from "lucide-react";

const Input = ({label, value, onChange, placeholder, type, isSelect, options, customInput}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="mb-4">
            <label className="text-[13px] text-shadow-slate-800 block mb-1">
                {label}
            </label>
            <div className="relative">
                {customInput ? (customInput) : (isSelect ? (
                    <select className='w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500' value={value}
                        onChange={(e) => onChange(e)}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-8 text-gray-700 leading-tight focus:border-blue-500"
                placeholder={placeholder}
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                value={value}
                onChange={(e) => onChange(e)}/>
                ))}

                {type === "password" && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ">
                        {showPassword ? (
                            <EyeIcon size={20} className="text-blue-800" onClick={toggleShowPassword} />
                        ) : (
                            <EyeOff size={20} className="text-slate-400" onClick={toggleShowPassword} />
                        )}
                    </span>
                )}
            </div>

        </div>
    );
};

export default Input;