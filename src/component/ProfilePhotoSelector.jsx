import React, {useRef, useState} from 'react';
import {Trash, Upload, User} from "lucide-react";

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className="hidden"/>
            {!image ? (
                <div className="w-20 h-20 flex justify-center items-center bg-blue-200 rounded-full relative">
                    <User className="text-blue-500" size={35} />
                    <button
                        onClick={onChooseFile}
                        className="w-8 h-8 flex justify-center items-center bg-blue-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer">
                        <Upload size={15} />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img src={previewUrl} alt="profile photo" className="w-20 h-20 object-cover rounded-full" />
                    <button onClick={handleRemoveImage}
                            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer">
                        <Trash size={15} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;