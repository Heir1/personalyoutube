import React, {useEffect, useState} from 'react'
import Header from '../Header/Header'
import Siderbar from '../Siderbar/Siderbar'
import Channel from './Channel'
import Spinner from '../Spinner/Spinner'
import { Navigate, useNavigate } from 'react-router-dom';

const Channels = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
    }, [])

    if(!localStorage.getItem('access_token')){
        navigate("/")
    }
    else
    {
        const channels = JSON.parse(localStorage.getItem('channels'))[0];
        return(
            <React.Fragment>
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <Siderbar/>
                        
                        {
                            ! channels ? (
                                <Spinner/>
                            )
                            :
                            (
                                <Channel channels={channels} />
                            )
                        }
                        
                    </div>
                </div>   
            </React.Fragment>
        ) 
    }


}

export default Channels