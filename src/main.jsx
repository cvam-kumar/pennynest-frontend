import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import {AppContextProvider} from "./context/AppContext.jsx";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <AppContextProvider>
        <App/>
    </AppContextProvider>
)
