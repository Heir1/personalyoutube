import React from "react";
import Header from "../Header/Header";
import Siderbar from "../Siderbar/Siderbar";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";


const Notifications = () => {

    const navigate = useNavigate();

    if(!localStorage.getItem('access_token')){
        navigate("/")
    }
    else
    {
        return(
            <React.Fragment>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <Siderbar/>
                        <Notification/>
                    </div>
                </div>   
            </React.Fragment>
        ) 
    }
}

export default Notifications;