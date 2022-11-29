import React, {useState, useEffect} from "react";
import Siderbar from "../Siderbar/Siderbar";
import Header from "../Header/Header";
import Cardprofile from "./Cardprofile";
import Editprofile from "./Editprofile";
import { useNavigate, useParams } from 'react-router-dom';


const Profile = () => {

    const [videoFilter, setVideoFilter] = useState("");
    const [photo, setPhoto] = useState("");

    const {id} = useParams();

    const navigate = useNavigate();

    const renderprofileHandler = (photo) => {
        setPhoto(photo);
    }

    useEffect(()=>{
        // console.log(count);
    })

    if(!localStorage.getItem('access_token')){
        navigate('/')
    }else{
        return(
            <React.Fragment>
                <Header setVideoFilter={setVideoFilter} photo={photo} />
                <div className="container-fluid">
                    <div className="row">
                        <Siderbar/>
                        {
                            id ? (
                                <Editprofile userid={id} renderprofileHandler={renderprofileHandler} />
                            ) 
                            :
                            (
                                <Cardprofile/>
                            )
                            
                           
                        }
                        
                    </div>
                </div>   
            </React.Fragment>
        )
    }
    
}

export default Profile;