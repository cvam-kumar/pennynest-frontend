import React, {useContext} from 'react';
import {assets} from "../assets/assets.js";
import Input from "../component/Input.jsx";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../util/validation.js";
import {axiosConfig} from "../util/axiosConfig.js";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import AppContext from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const {setUser} = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        setError("");
        try{
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN,{
                email,
                password
            })
            const {token, user} = response.data;
            if(token){
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        }catch(err){
            console.log("Something went wrong", err);
            toast.error(err.message);
            setError(err.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/*background image with blur*/}
            <img src={assets.logo_bg} alt="Background"
                 className="absolute inset-0 w-full h-full object-cover filter blur-sm"/>

            <div className="relative z-10 w-full max-w-lg px-6">
                <div
                    className="bg-white bg-opacity-80 rounded-lg shadow-2xl backdrop-blur-sm p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back!
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your details to login.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email"
                               placeholder="fullname@example.com" type="text"/>

                        <Input value={password} onChange={(e) => setPassword(e.target.value)} label="Password"
                               placeholder="************" type="password"/>
                        {error && (<p className="text-sm text-center bg-red-100 p-2 rounded text-red-800">{error}</p>)}
                        <button disabled={isLoading}
                            className={`bg-blue-600 w-full py-2 text-lg text-white font-medium cursor-pointer rounded-md flex justify-center items-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                            type="submit">{isLoading ? (
                                <LoaderCircle className="animate-spin w-5 h-5" />) : ("Login")}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-4">Not have register yet? <Link
                            to="/signup"
                            className="font-medium text-blue-600 underline hover:text-blue-800 transition-colors">Register</Link>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;