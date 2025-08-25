import React from 'react';
import {assets} from "../assets/assets.js";
import Input from "../component/Input.jsx";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../util/validation.js";
import {axiosConfig} from "../util/axiosConfig.js";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";
import ProfilePhotoSelector from "../component/ProfilePhotoSelector.jsx";
import {uploadProfileImage} from "../util/uploadProfileImage.js";

const Signup = () => {
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [profilePhoto, setProfilePhoto] = React.useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);


        //basic validation
        if(!validateEmail(email)){
            setError("Please enter a valid email");
            setIsLoading(false);
            return;
        }
        if(!password.trim()){
            setError("Please enter a password");
            setIsLoading(false);
            return;
        }
        if(!fullName.trim()){
            setError("Please enter a full name");
            setIsLoading(false);
            return;
        }
        setError("");
        try{
            if(profilePhoto){
                const imageUrl = await uploadProfileImage(profilePhoto);
                console.log(imageUrl);
                profileImageUrl = imageUrl || "";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            })
            if(response.status === 201){
                toast.success("Profile created successfully!");
                navigate("/login");
            }

        }catch (error){
            console.log("Something went wrong!", error);
            setError(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/*background image with blur*/}
            <img src={assets.logo_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-2xl backdrop-blur-sm p-8 max-h-[90vh] overflow-y-auto" >
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your spending's by joining with us.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} label="Shivam Kumar" placeholder="Enter full name" type="text" />
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="fullname@example.com" type="text" />
                            <div className="col-span-2" >
                                <Input value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="************" type="password" />
                            </div>
                        </div>
                        {error && (<p className="text-sm text-center bg-red-100 p-2 rounded text-red-800">{error}</p>)}
                        <button disabled={isLoading} className={`bg-blue-600 w-full py-2 text-lg text-white font-medium cursor-pointer rounded-md flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {isLoading ? (
                                <><LoaderCircle className="animate-spin w-5 h-5" />Signing up...</>
                            ) : ("Register")}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-4">Already have an account? <Link to="/login" className="font-medium text-blue-600 underline hover:text-blue-800 transition-colors">Login</Link></p>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Signup;